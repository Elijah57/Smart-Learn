const asyncHandler = require("express-async-handler");
const Course = require("../../models/courses/courseModel");

// get all courses
const getAllCourse = asyncHandler(async (req, res)=>{
    try{
        const courses = await Course.find().sort("createdAt")
        res.status(200).json({
            status: true,
            message: "Data Fetched",
            courses
        })
    }catch(error){
        throw new Error(error);
    }
});



module.exports = getAllCourse;