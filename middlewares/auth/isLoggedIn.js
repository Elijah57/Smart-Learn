const User = require("../../models/users/userModel");
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
require('dotenv').config();

const isLoggedIn = asyncHandler(async (req, res, next)=>{
    const token = req?.header("authorization")?.split(" ")[1];

    if (!token) return res.status(401).json({msg: "Unauthorized, proceed to login"});

    try{
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decode?.id);
        if (!user){
            return res.status(401).json({error: "Invalid token"})
        }
        req.user = user;
        next();   
    }catch (error){
        res.status(401).json({error: "Invalid token"})
    }
    
});

module.exports = isLoggedIn;

