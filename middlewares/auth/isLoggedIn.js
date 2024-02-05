const User = require("../../models/users/userModel");
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
require('dotenv').config();

const isLoggedIn = asyncHandler(async (req, res, next)=>{
    const token = req?.header("authorization")?.split(" ")[1];
    // console.log(token);
    // console.log(req.header("authorization"))
    if (token){
        try{
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decode?.id)
            req.user = user;
            next();   
        }catch (error){
            throw new Error(error)
        }
    }else{
        throw new Error("Ther is no token attached to the header")
    }
});


module.exports = isLoggedIn;

