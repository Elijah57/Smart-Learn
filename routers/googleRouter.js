const googleRouter = require('express').Router();
const passport = require('passport');
const { generateToken } = require('../configs/jwt');
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');

googleRouter.get("/login/success", asyncHandler(async (req, res)=>{

    if(req.user){
        const findUser = await User.findOne({email: req.user.email});
        if(findUser){
            return res.status(200).json({
                status: true,
                message: "Login Successful",
                token: generateToken(findUser?._id),
                role: findUser?.roles,
                username: findUser?.firstname +" "+ findUser?.lastname,
                user_image: findUser?.user_image,    
                auth: "google" 
              })
        }
    }else{
        throw new Error("Something when wrong!")
    }
}));

googleRouter.get("/login/failed", asyncHandler(async (req, res)=>{
    res.status(401).json({
        status: false,
        message: "Login failed"
    })
}));

googleRouter.get("/auth/google", passport.authenticate("google", ["profile", "email"]));

googleRouter.get("/auth/google/callback",
    passport.authenticate("google", {
        successRedirect: "/login/success",
        failureRedirect: "/login/failed"
    })
);

googleRouter.get("/auth/logout", asyncHandler(async (req, res, next)=>{
    req.logout((err)=>{
        console.log("Logged out");
        if (err) return next(err);
    })
    res.redirect("/");
}))

module.exports = googleRouter;

