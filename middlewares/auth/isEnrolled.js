const Course = require("../../models/courses/courseModel");
const asyncHandler = require('express-async-handler');

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

module.exports = isEnrolled;