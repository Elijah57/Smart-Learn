const User = require('../models/userModel');
const asyncHandler = require('express-async-handler')
const {generateToken} = require('../configs/jwt')
const validateMongodbId  = require('../configs/validateDB_id')
const crypto = require('crypto');
// what is the use of express-async-handler is used to


// create a user

const registerUser = asyncHandler ( async (req, res)=>{
    // Before user is registered check if email, has been created with another user before
    const email = req.body.email;
    const findUser = await User.findOne({email: email});

    // if user not found
    if(!findUser){
        const createUser = await User.create(req.body);
        res.status(200).json({
            status:true,
            message: "User Created Successfully",
            createUser
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
        const resetlink = `http://localhost:4000/api/auth/reset-password/${resettoken}`;

        // data to be sent
        const data = {
            to: email,
            text: `Hey ${user.firstname} ${user.lastname}`,
            subject: "Forgot Password",
            html: resetlink
        }
        //send email

        sendMail(data);

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