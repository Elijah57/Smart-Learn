const User = require('../../models/users/userModel');
const asyncHandler = require('express-async-handler')
const ejs = require("ejs");
const path = require('path')
const sendMail = require("../../utils/mails/mailer")
const validateEmail = require("../../utils/helpers/validateEmail")
const validatePassword = require("../../utils/helpers/validatePassword")
require("dotenv").config()

const HOST = process.env.HOST || "http://localhost/4000";

const registerUser = asyncHandler ( async (req, res)=>{
    
    const { firstname, lastname, email, password, confirmPassword } = req.body;

    const isEmailValid = validateEmail(email)
    if (isEmailValid === null) {return res.status(400).json({status: false, msg: "Invalid email address"})}
    
    const validatedPassword = validatePassword(password, res);
    if(validatedPassword !== confirmPassword){ return res.status(400).json({status: false, message: "Password does not match"}) }

    const userInput = {firstname, lastname, email, validatedPassword};

    // check if email already exists
    const findUser = await User.findOne({email: email});

    // if user not found
    if(findUser){
        return res.status(400).json({status: false, msg: "User with Email already Exists"})
    }
    const createdUser = await User.create(userInput);
    const userVerificationCode = await createdUser.createActivationToken();
    const userActivationLink = `${HOST}/api/verify-email/${userVerificationCode}`

    const emailData= {user: createdUser.firstname, userActivationLink};

    try{
        await sendMail({
            email: createdUser.email,
            subject: "Activate Your Account",
            template: "activation-mail.ejs",
            emailData
        });

        return res.status(200).json({
            status:true,
            message: "User Created Successfully, check email for verification mail",
            createdUser
        })
    }catch(error){
        console.error("Error sending activation email:", error);
        // await createdUser.remove(); // Rollback user creation
        res.status(500).json({ status: false, message: "Failed to send activation email" });
    
    }
        
    }
);

module.exports = registerUser;