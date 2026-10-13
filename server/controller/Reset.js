const User = require("../Models/User");
const mailsender = require("../Utils/mailsender");
const bcrypt = require("bcrypt");
const Crypto  = require("crypto");
const passwordResetTemplate = require("../mail/templates/passwordReset");

exports.resetpasswordToken = async(req,res)=>{
   
    try {

        const email = typeof req.body.email === "string" ? req.body.email.trim().toLowerCase() : "";
        if (!email) return res.status(400).json({ sucsess: false, message: "Email is required" });
        const user = await User.findOne({email});
    
        if(!user)
        {
            return res.status(401).json({
                sucsess:false,
                message:"user not exist",
            });
        }
        //generate token 
        const token = Crypto.randomUUID();
    
        await User.findOneAndUpdate({_id:user._id},{token:token,
            resetpasswordexpires:Date.now()+5*60*1000,
        },{new:true});

        const clientUrl = (process.env.CLIENT_URL || "http://localhost:3000").split(",")[0];
        const url = `${clientUrl.replace(/\/$/, "")}/update-password/${token}`;
    
        try {
            await mailsender(email, "Reset your Edunexa password", passwordResetTemplate(url));
        } catch (error) {
            await User.updateOne(
                { _id: user._id, token },
                { $unset: { token: 1, resetpasswordexpires: 1 } }
            );
            throw error;
        }

        return res.status(200).json({
            sucsess:true,
            message:"email sent sucsessfully",
        });
        
    } catch (error) {
        
        console.error("Password reset email submission failed");
        return res.status(500).json({
            sucsess:false,
            message:"issue with sending mail of reset link",
        });
    }

}


exports.resetpassword = async(req,res)=>{
    
    try {

        const {password,confirmpassword,token} = req.body;

        if(password!==confirmpassword)
            {
                 return res.status(401).json({
                        sucsees:false,
                        message:"password does not match",
                    })
            }

        const userDetails = await User.findOne({ token, resetpasswordexpires: { $gt: Date.now() } });

        if(!userDetails)
        {
                return res.status(401).json({
                    sucsees:false,
                    message:"user not found",
                })
        }

        const hashedpassword = await bcrypt.hash(password,10);
        await User.findOneAndUpdate(
            { _id: userDetails._id },
            { password: hashedpassword, token: undefined, resetpasswordexpires: undefined }
        );
        
        return res.status(200).json({
            sucsees:true,
            message:"password updated sucsessfully",
        });
    } catch (error) {
        return res.status(500).json({
            sucsees:false,
            message:"issue with password change ",
        })
    }
}
