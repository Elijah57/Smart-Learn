const User = require('../../models/users/userModel');
const asyncHandler = require('express-async-handler')
const ejs = require("ejs");
const path = require('path')
const sendMail = require("../../utils/mails/mailer")


const registerUser = asyncHandler ( async (req, res)=>{
    // Before user is registered check if email, has been created with another user before
    const email = req.body.email;
    const findUser = await User.findOne({email: email});

    // if user not found
    if(!findUser){
        const createdUser = await User.create(req.body);
        const userVerificationCode = await createdUser.createActivationToken();
        const userActivationLink = `http://localhost:4000/api/verify-email/${userVerificationCode}`

        const data= {user: createdUser.firstname, userActivationLink}
        const html = await ejs.renderFile(path.join(__dirname, "../mails/activation-mail.ejs"), data)
    
        try{
            await sendMail({
                email: createdUser.email,
                subject: "Activate Your Account",
                template: "activation-mail.ejs",
                data
            });
        }catch(error){
            throw new Error("Something went wrong!")
        }
        res.status(200).json({
            status:true,
            message: "User Created Successfully",
            createdUser
        })
    }else{
        return res.status(400).json({
            status: false,
            message: "User with Email already Exists"
        })
    }
});

module.exports = registerUser;