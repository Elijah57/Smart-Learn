const User = require('../models/userModel');
const asyncHandler = require('express-async-handler')
const {generateToken} = require('../configs/jwt')
const validateMongodbId  = require('../configs/validateDB_id')
const crypto = require('crypto');
const activationCode = require("../configs/activationToken")
const ejs = require("ejs");
const path = require('path')
const sendMail = require("../controllers/emailController")
// what is the use of express-async-handler is used to


// create a user

const registerUser = asyncHandler ( async (req, res)=>{
    // Before user is registered check if email, has been created with another user before
    const email = req.body.email;
    const findUser = await User.findOne({email: email});

    // if user not found
    if(!findUser){
        const createdUser = await User.create(req.body);
        const userVerificationCode = activationCode();

        const data= {user: createdUser.firstname, userVerificationCode}
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
        throw new Error("User with Email already Exists")
    }
});

// Login user
const loginUser = asyncHandler(async (req, res)=>{
    const {email, password} = req.body;
    // check if user exist or not
    const findUser = await User.findOne({email: email});
    
    if (findUser && (await findUser.isPasswordMatched(password))){
        // generate a token - create jwt token
        res.status(200).json({
            status:true,
            message: "Logged in Successfully",
            token: generateToken(findUser?._id),
            role: findUser?.roles,
            username: findUser?.firstname +" "+ findUser?.lastname,
            user_image: findUser?.user_image,     
          })
    }else{
        throw new Error("Invalid Credentials")
    }
});

const getMyProfile = asyncHandler(async (req, res)=>{
    const { _id } = req.user;
    try{
        const user = await User.findById(_id);
        res.status(200).json({
            status: true,
            message: "User Profile",
            user: user
        })
    }catch(error){
        throw new Error(error)
    }
})
// update a user
const updateUser = asyncHandler(async (req, res)=>{
    const { _id } = req.user;
    validateMongodbId(_id); //validate id from config mongodb id validator
    try{
        const user = await User.findByIdAndUpdate(_id, req.body, {new: true});
        res.status(200).json({
            status:true,
            message: "Profile updated successfully",
        });
    }catch(error){
        throw new Error(error);
    }
});


// update password
const updatePassword = asyncHandler(async (req, res)=>{
    const { _id } = req.user;
    const { password } = req.body;

    validateMongodbId(_id);
    try{
        const user = await User.findById(_id);
        if (user && (await user.isPasswordMatched(password))){
            throw new Error("Put in a new password")
        }else{ //if new password is given
            user.password = password; //update user password
            await user.save();
            res.status(200).json({
                status: true,
                message: "Password Updated Successfully"
            })
        }

    }catch (error){
        throw new Error(error);
    }
});


// generate forgot password token, input - email
const forgotPasswordToken = asyncHandler(async (req, res)=>{
    const {email} = req.body;
    const user = await User.findOne({email:email});

    if(!user) throw new Error("Email not registered")
    try{
        const resettoken = await user.createPasswordResetToken();
        await user.save();
        const resetlink = `http://localhost:4000/api/reset-password/${resettoken}`;

        // data to be sent
        const data= {user: user.firstname, resetlink}
        const html = await ejs.renderFile(path.join(__dirname, "../mails/reset-password.ejs"), data)
        
        try{
            //send email
            sendMail({
                email: email,
                subject: "Password Reset Link",
                template: "reset-password.ejs",
                data
            });

        }catch(error){
            throw new Error("Something went wrong")
        }

        res.status(200).json(resetlink)
    }catch (error){
        throw new Error(error)
    }
});

//
const resetPassword = asyncHandler(async (req, res)=>{
    const {password} = req.body;
    const { token } = req.params; 
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({passwordResetToken: hashedToken, passwordResetExpires: {$gt: Date.now()},});
    if (!user) throw new Error("Token Expired, Please try again");
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    res.status(200).json({
        status: true,
        message: "Password Reset Successful"
    })
});

module.exports = {
    registerUser, 
    loginUser,
    updateUser, 
    updatePassword,
    forgotPasswordToken,
    resetPassword,
    getMyProfile
}