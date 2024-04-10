const User = require('../../models/users/userModel');
const asyncHandler = require('express-async-handler')
const ejs = require("ejs");
const path = require('path')
const sendMail = require("../../utils/mails/mailer")
require("dotenv").config()

const HOST = process.env.HOST;

const forgotPasswordToken = asyncHandler(async (req, res)=>{
    const {email} = req.body;
    const user = await User.findOne({email:email});

    if(!user){
        return res.status(404).json({
            status: false,
            message: "Email not registered !"
        });
    }
    
    const resettoken = await user.createPasswordResetToken();
    await user.save();
    const resetlink = `${HOST}/api/auth/reset-password/${resettoken}`;

    // data to be sent
    const emailData= {user: user.firstname, resetlink};
    
    try{
        //send email
        await sendMail({
            email: email,
            subject: "Password Reset Link",
            template: "reset-password.ejs",
            emailData
        });

        return res.status(200).json({
            status: true,
            message: "Check your email for password reset link"
        })
    }catch(error){
        res.status(500).json({ status: false, message: "Failed to send email" });
    }

   
});

module.exports = forgotPasswordToken;