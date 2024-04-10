const User = require("../../models/users/userModel");
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
require('dotenv').config();

const isLoggedIn = asyncHandler(async (req, res, next)=>{
    const token = req?.header("authorization")?.split(" ")[1];

    if (!token) return res.status(401).json({msg: "Access Denied"});

    try{
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user._id = decode?.id
        next();   
    }catch (error){
        res.status(401).json({error: "Invalid token"})
    }
    
});


module.exports = isLoggedIn;

