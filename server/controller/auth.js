const OTP = require("../Models/OTP");
const User = require("../Models/User");
const bcrypt = require("bcrypt");
const Profile = require("../Models/Profile");
const jwt = require("jsonwebtoken");

const mailsender = require("../Utils/mailsender");
const emailTemplate = require("../mail/templates/emailVerificationTemplate");
const { OTP_TTL_MS, OTP_RESEND_INTERVAL_MS, OTP_MAX_ATTEMPTS, OTP_PURPOSE, generateOtp, hashOtp, isOtpMatch } = require("../Utils/otp");
require("dotenv").config();

//otp generator 
exports.sendOtp = async(req,res)=>{
    const email = typeof req.body.email === "string" ? req.body.email.trim().toLowerCase() : "";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ succsess: false, message: "A valid email is required" });
    }

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(401).json({ succsess: false, message: "user already exist " });
        }

        const now = new Date();
        const otp = generateOtp();
        const pendingToken = require("crypto").randomUUID();
        let reservation;
        try {
            reservation = await OTP.findOneAndUpdate(
                {
                    email,
                    purpose: OTP_PURPOSE,
                    $or: [
                        { lastSentAt: { $exists: false } },
                        { lastSentAt: { $lte: new Date(now.getTime() - OTP_RESEND_INTERVAL_MS) } },
                    ],
                },
                {
                    $set: {
                        email,
                        purpose: OTP_PURPOSE,
                        lastSentAt: now,
                        createdAt: now,
                        purgeAt: new Date(now.getTime() + OTP_TTL_MS),
                        pendingHash: hashOtp(email, OTP_PURPOSE, otp),
                        pendingToken,
                    },
                    $setOnInsert: {
                        attempts: 0,
                        consumedAt: null,
                    },
                },
                { new: true, upsert: true, setDefaultsOnInsert: true, timestamps: false, overwriteImmutable: true }
            );
        } catch (error) {
            if (error.code === 11000) {
                return res.status(429).json({ succsess: false, message: "Please wait before requesting another code." });
            }
            throw error;
        }

        try {
            await mailsender(email, "Your Edunexa verification code", emailTemplate(otp));
        } catch (_) {
            await OTP.updateOne(
                { _id: reservation._id, pendingToken },
                { $unset: { pendingHash: 1, pendingToken: 1 } }
            );
            console.error("Verification email submission failed");
            return res.status(503).json({
                succsess: false,
                message: "Unable to send the verification email. Please try again shortly.",
            });
        }

        const activated = await OTP.updateOne(
            { _id: reservation._id, pendingToken },
            {
                $set: {
                    otpHash: reservation.pendingHash,
                    otpExpiresAt: new Date(now.getTime() + OTP_TTL_MS),
                    purgeAt: new Date(now.getTime() + OTP_TTL_MS),
                    attempts: 0,
                    consumedAt: null,
                },
                $unset: { pendingHash: 1, pendingToken: 1 },
            }
        );
        if (!activated.modifiedCount) {
            console.error("Verification email was accepted but code activation failed");
            return res.status(503).json({ succsess: false, message: "Unable to complete verification. Please request a new code." });
        }

        return res.status(200).json({
            succsess: true,
            message: "Verification email accepted for sending",
        });
    } catch (_) {
        console.error("Unable to process verification code request");
        return res.status(500).json({ sucsess: false, message: "some error with otp generation" });
    }
}

//signup

exports.signUp = async(req,res)=>{
    try {

        //fetch data from req body
        const{FirstName,LastName,email,password,confirmpassword,
            accountType,otp
        } = req.body;
        const normalizedEmail = email?.trim().toLowerCase();

        //validations perform 
        if(!FirstName || !LastName || !normalizedEmail ||!password || !confirmpassword || !otp )
        {
            return res.status(403).json({
                sucsess:false,
                message:"all feilds are require",
            });
        }

        if(password!==confirmpassword)
        {
            return res.status(400).json({
                sucsess:false,
                message:"password does not match"
            });
        }

        //check user already exist or not
        const userexist = await User.findOne({email: normalizedEmail});
        if(userexist)
        {
            return res.status(402).json({
                sucsess:false,
                message:"user already exist please login",
            });
        }

        if (!/^\d{6}$/.test(String(otp))) {
            return res.status(400).json({ sucsess: false, message: "Invalid OTP" });
        }

        const otpRecord = await OTP.findOne({ email: normalizedEmail, purpose: OTP_PURPOSE });
        const now = new Date();
        if (otpRecord?.attempts >= OTP_MAX_ATTEMPTS) {
            return res.status(429).json({ sucsess: false, message: "Too many incorrect codes. Request a new code." });
        }
        if (!otpRecord || !otpRecord.otpHash || otpRecord.consumedAt || !otpRecord.otpExpiresAt || otpRecord.otpExpiresAt <= now) {
            return res.status(400).json({ sucsess: false, message: "OTP is invalid or expired. Request a new code." });
        }

        const suppliedHash = hashOtp(normalizedEmail, OTP_PURPOSE, String(otp));
        if (!isOtpMatch(otpRecord.otpHash, suppliedHash)) {
            const attempt = await OTP.updateOne(
                { _id: otpRecord._id, consumedAt: null, otpExpiresAt: { $gt: now }, attempts: { $lt: OTP_MAX_ATTEMPTS } },
                { $inc: { attempts: 1 } }
            );
            const attemptsUsed = otpRecord.attempts + (attempt.modifiedCount ? 1 : 0);
            return res.status(attemptsUsed >= OTP_MAX_ATTEMPTS ? 429 : 401).json({
                sucsess: false,
                message: attemptsUsed >= OTP_MAX_ATTEMPTS ? "Too many incorrect codes. Request a new code." : "Invalid OTP",
            });
        }

        const consumed = await OTP.updateOne(
            {
                _id: otpRecord._id,
                otpHash: otpRecord.otpHash,
                consumedAt: null,
                otpExpiresAt: { $gt: now },
                attempts: { $lt: OTP_MAX_ATTEMPTS },
            },
            { $set: { consumedAt: now } }
        );
        if (!consumed.modifiedCount) {
            return res.status(401).json({ sucsess: false, message: "OTP is invalid, expired, or already used." });
        }

        //otp matched and then hash the password and save db

        const profileDetails = await Profile.create({
            gender:null,
            DateofBirth:null,
            about:null,
            phoneNumber:null,
            Profession:null,
        })
        const hashedpassword  = await bcrypt.hash(password,10);

        const user = await User.create({
            FirstName,LastName,email: normalizedEmail,password:hashedpassword,
          accountType,additionalDetails:profileDetails._id,
            image:`https://api.dicebear.com/8.x/croodles/svg?seed=${FirstName}`,

        });

        //return res

        return res.status(200).json({
            sucsess:true,
            message:"user registerd sucsessfully",
            data:user
        });


        
    } catch (error) {
        
        console.error("Signup request failed");
        return res.status(500).json({
            sucsess:false,
            message:"something wrong with signup ,please try again"
        })
    }
}

//login

exports.login = async(req,res)=>{
    try {
        
        //fetch data
        const {email,password} = req.body;
        const normalizedEmail = email?.trim().toLowerCase();

        //validate
        if(!normalizedEmail || !password)
        {
            return res.status(401).json({
                sucsess:false,
                message:"all feilds are required",
            });
        }

        //check user exist or not
        const userexist = await User.findOne({email: normalizedEmail}).populate("additionalDetails");

        if(!userexist)
        {
            return res.status(401).json({
                sucsess:false,
                message:"user does not exist first signup",
            });
        }

        //verify password 
        if(await bcrypt.compare(password,userexist.password))
        {
            //make a json token
            const payload = {
                email:userexist.email,
                id:userexist._id,
                accountType:userexist.accountType,
            }
            const token = jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"2h",
            });

            userexist.token = token;
            userexist.password = undefined;

            //create a cookie
            const options = {
                expires:new Date(Date.now()+3*24*60*60*1000),
                httpOnly:true,
            };
            res.cookie("token",token,options).status(200).json({
                succsess:true,
                message:"loggedin sucsessfully",
                token,
                userexist,
            });
            

        }
        else
        {
            return res.status(400).json({
                sucsees:false,
                message:"password does not match",
            }); 
        }

    } catch (error) {
        return res.status(500).json({
            sucsees:false,
            message:"logged in issue please try again",
        });
    }
}

//change password
exports.changepassword = async(req,res)=>{
    try {
        
        const userDetails = await User.findById(req.user.id);
        if(!userDetails)
        {
            res.status(404).json({
                sucsess:false,
                message:"user not found"
            })
        }

        //fetch data from req body
        const{oldPassword,newPassword,confirmnewPassword} = req.body;

        //validation
        if(!oldPassword || !newPassword || !confirmnewPassword)
        {
            return res.status(400).json({
                sucsess:false,
                message:"all fields are required",
            });
        }

        if(newPassword!==confirmnewPassword)
        {
             return res.status(401).json({
                    sucsees:false,
                    message:"password does not match",
                })
        }

    

        

        if(await bcrypt.compare(oldPassword,userDetails.password))
        {  
            const hashedpassword = await bcrypt.hash(newPassword,10);

            const resposnsee = await User.findOneAndUpdate({_id:userDetails._id},{password:hashedpassword},{new:true});


            try {
                
                await mailsender(
                    resposnsee.email,
                    "Password Update",
                    "Your password has been changed successfully."
                );

            } catch (error) {
                console.error("Password-update email submission failed");
            }

          

            return res.status(200).json({
                sucsess:true,
                message:"password updated sucsessfully",
            });

        }
        else
        {
            return res.status(403).json({
                sucsess:false,
                message:"old password incorrect",
            });
        }
       

    } catch (error) {
        return res.status(500).json({
            sucsess:false,
            message:"issue with password update",
        });
    }
}
