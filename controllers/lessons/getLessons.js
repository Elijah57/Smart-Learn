const CourseLesson = require("../../models/lessons/LessonModel");
const Course = require("../../models/courses/courseModel")
const asyncHandler = require("express-async-handler");
const validateMongodbId = require("../../configs/validateDB_id");


// get all course category
const getAllCourseLesson = asyncHandler(async (req, res)=>{
    try{
        const allCourseCat = await CourseLesson.find();
        res.status(200).json({
            status: true,
            message: "Course Category List",
            allCourseCat
        })

    }catch(error){
        throw new Error(error)
    }

});

module.exports =getAllCourseLesson;