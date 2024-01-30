const User = require("../models/userModel");
const Course = require("../models/courseModel")
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

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

// isAdmin Authentication
const isAdmin = asyncHandler(async (req, res, next)=>{

    const {email}  = req.user;
    const isAdmin = await User.findOne({email: email});
    
    if (isAdmin.roles !== "admin"){
        throw new Error("You are not an admin");
    }else{
        next();
    }
});


// isInstructor Authentication
const isInstructor = asyncHandler(async (req, res, next)=>{
    const { email } = req.user;
    const isInstructor = await User.findOne({email: email});
    if (isInstructor.roles !== "instructor"){
        throw new Error("You are not an Instructor");
    }else{
        next();
    }
});

// isUser Enrolled
const isEnrolled = asyncHandler(async (req, res, next)=>{
    const { _id } = req.user;
    const { id } = req.params;

    const foundCourse = await Course.findById(id);
    if(foundCourse.students.includes(_id)){
        next()
    }else{
        throw new Error("You are not enrolled in this course")
    }
});

module.exports = {isLoggedIn, isAdmin, isInstructor, isEnrolled};

