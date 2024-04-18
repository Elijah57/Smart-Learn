const User = require('../../models/users/userModel');
const asyncHandler = require('express-async-handler')
const ejs = require("ejs");
const path = require('path')
const sendMail = require("../../utils/mails/mailer")
require("dotenv").config()

const HOST = process.env.HOST

const verificationLink = asyncHandler(async (req, res)=>{
    const {email} = req.user;
    const createdUser = await User.findOne({email:email});

    if(createdUser.isVerified === true){
        return res.status(400).json({
            status: false,
            message: "User Email Already Verified"
        })
    }
    try{
        const userVerificationCode = await createdUser.createActivationToken();
        await createdUser.save()
        const userActivationLink = `${HOST}/api/auth/verify-email/${userVerificationCode}`

        const emailData= {user: createdUser.firstname, userActivationLink}
        const html = await ejs.renderFile(path.join(__dirname, "../../mails/activation-mail.ejs"), emailData)
    
        try{
            await sendMail({
                email: createdUser.email,
                subject: "Activate Your Account",
                template: "activation-mail.ejs",
                emailData
            });
        }catch(error){
            throw new Error("Something went wrong!")
        }

        res.status(200).json({
            status: true,
            message: "Check your email for password reset link"
        })
    }catch (error){
        throw new Error(error)
    }
});

module.exports = verificationLink;