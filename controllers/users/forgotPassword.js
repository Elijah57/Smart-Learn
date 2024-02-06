const User = require('../../models/users/userModel');
const asyncHandler = require('express-async-handler')
const ejs = require("ejs");
const path = require('path')
const sendMail = require("../../utils/mails/mailer")


const forgotPasswordToken = asyncHandler(async (req, res)=>{
    const {email} = req.body;
    const user = await User.findOne({email:email});

    if(!user){
        return res.status(404).json({
            status: false,
            message: "Email not registered !"
        });
    }
    try{
        const resettoken = await user.createPasswordResetToken();
        await user.save();
        const resetlink = `http://localhost:4000/api/reset-password/${resettoken}`;

        // data to be sent
        const data= {user: user.firstname, resetlink}
        const html = await ejs.renderFile(path.join(__dirname, "../../mails/reset-password.ejs"), data)
        
        try{
            //send email
            sendMail({
                email: email,
                subject: "Password Reset Link",
                template: "reset-password.ejs",
                data
            });
        }catch(error){
            throw new Error("Something went wrong");
        }

        res.status(200).json({
            status: true,
            message: "Check your email for password reset link"
        })
    }catch (error){
        throw new Error(error)
    }
});

module.exports = forgotPasswordToken;