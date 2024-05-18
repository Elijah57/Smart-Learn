const User = require("../../models/users/userModel");
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');


const isInstructor = asyncHandler(async (req, res, next)=>{
    const { email } = req.user;
    const user = await User.findOne({email: email});
    if (user.roles !== "instructor"){
        return res.status(401).json({msg: "You are not an Instructor"});
    }else{
        next();
    }
});


module.exports = isInstructor;

