const User = require("../../models/users/userModel");
const asyncHandler = require('express-async-handler');


const isAdmin = asyncHandler(async (req, res, next)=>{

    const {email}  = req.user;
    const isAdmin = await User.findOne({email: email});
    
    if (isAdmin.roles !== "admin"){
        throw new Error("You are not an admin");
    }else{
        next();
    }
});


module.exports = isAdmin;

