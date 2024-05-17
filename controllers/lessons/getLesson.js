const CourseLesson = require("../../models/lessons/LessonModel");
const Course = require("../../models/courses/courseModel")
const asyncHandler = require("express-async-handler");
const validateMongodbId = require("../../configs/validateDB_id");

//  get a Lesson
const getCourseLesson = asyncHandler(async (req, res)=>{
    const { id } = req.params;
    validateMongodbId(id);

    const lesson = await CourseLesson.findById(id);
    
    if(!lesson){
        return res.status(400).json({
            status: false,
            message: "Course Lesson Not Found"
        })
    }
    try{
        
        res.status(200).json({
            status: true,
            message: "Course category Found!!",
            courseCat
        })
    }catch(error){
        throw new Error(error);
    }

});


module.exports = getCourseLesson;