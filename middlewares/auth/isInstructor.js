const User = require("../../models/users/userModel");
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');


const isInstructor = asyncHandler(async (req, res, next)=>{
    const { email } = req.user;
    const isInstructor = await User.findOne({email: email});
    if (isInstructor.roles !== "instructor"){
        throw new Error("You are not an Instructor");
    }else{
        next();
    }
});


module.exports = isInstructor;

