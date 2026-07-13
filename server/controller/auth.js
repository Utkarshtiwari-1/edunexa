const otpGenerator = require("otp-generator");
const OTP = require("../Models/OTP");
const User = require("../Models/User");
const bcrypt = require("bcrypt");
const Profile = require("../Models/Profile");
const jwt = require("jsonwebtoken");

const mailsender = require("../Utils/mailsender");
const emailTemplate = require("../mail/templates/emailVerificationTemplate");
require("dotenv").config();

//otp generator 
exports.sendOtp = async(req,res)=>{
    try {

        //fetch email
    const email = req.body.email?.trim().toLowerCase();
    if (!email) {
        return res.status(400).json({ succsess: false, message: "Email is required" });
    }

    //check if user already exist
    const userexist = await User.findOne({email});
    if(userexist)
    {
        return res.status(401).json({
            succsess:false,
            message:"user already exist ",
        });
    }

    let otp = otpGenerator.generate(6,{
        upperCaseAlphabets:false,
        lowerCaseAlphabets:false,
        specialChars:false,
    });

    //check unique otp or not

    let result = await OTP.findOne({otp:otp});

    while(result)
    {
        otp = otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        });

        result = await OTP.findOne({otp:otp});

    }

    // Save first so the OTP can be verified only after a successful delivery.
    const otpbody = await OTP.create({email, otp});

    try {
        const mailResponse = await mailsender(
            email,
            "Your StudyNotion verification code",
            emailTemplate(otp)
        );
        console.log("OTP email accepted by provider", mailResponse.messageId);
    } catch (mailError) {
        // Do not keep an OTP that the user did not receive.
        await OTP.findByIdAndDelete(otpbody._id);
        console.error("Unable to send OTP email", {
            code: mailError.code,
            message: mailError.message,
        });
        return res.status(503).json({
            succsess: false,
            message: "Unable to send the verification email. Please try again shortly.",
        });
    }

    return res.status(200).json({
        succsess:true,
        message:"otp genrated and send ",
    })
        
    } catch (error) {
        
        console.log("error in otp generator",error);
        return res.status(500).json({
            sucsess:false,
            message:"some error with otp generation",
        })
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

        //fetch recent otp from the db for this user
        const recentotp = await OTP.find({email: normalizedEmail}).sort({createdAt:-1}).limit(1);

        if(recentotp.length==0)
        {
            return res.status(400).json({
                sucsess:false,
                message:"otp not found in db",
            });
        }
        else if(otp!==recentotp[0].otp)
        {
            return res.status(401).json({
                sucsess:false,
                message:"Invalid OTP",
            });
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
        
        console.log("error in signup",error);
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
        
        console.log("user id",req.user.id);
        const userDetails = await User.findById(req.user.id);
        if(!userDetails)
        {
            console.log("user not found");
            res.status(404).json({
                sucsess:false,
                message:"user not found"
            })
        }

        console.log("user",userDetails);
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
            console.log("password comparision hogya");
            const hashedpassword = await bcrypt.hash(newPassword,10);

            const resposnsee = await User.findOneAndUpdate({_id:userDetails._id},{password:hashedpassword},{new:true});

            console.log(resposnsee);

            try {
                
                await mailsender(
                    resposnsee.email,
                    "Password Update",
                    "Your password has been changed successfully."
                );

            } catch (error) {
                console.error("Password-update email failed", error.message);
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
