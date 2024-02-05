const CourseLesson = require("../../models/lessons/courseLessonModel");
const Course = require("../../models/courses/courseModel")
const asyncHandler = require("express-async-handler");
const validateMongodbId = require("../../configs/validateDB_id");

// delete course category
const deleteCourseLesson = asyncHandler(async (req, res)=>{
    const { id } = req.params;
    validateMongodbId(id);

    const courseCat = await CourseLesson.findById(id);
    if(!courseCat){
        return res.status(400).json({
            status: false,
            message: "Lesson Not Found"
        })
    }

    try{
        const courseCat = await CourseLesson.findByIdAndDelete(id);
        res.status(200).json({
            status: true,
            message: "Lesson Successfully Deleted"
        })
    }catch(error){
        throw new Error(error);
    }

});

module.exports = deleteCourseLesson;
