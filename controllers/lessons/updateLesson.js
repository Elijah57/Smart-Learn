const CourseLesson = require("../../models/lessons/LessonModel");
const Course = require("../../models/courses/courseModel")
const asyncHandler = require("express-async-handler");
const validateMongodbId = require("../../configs/validateDB_id");



// update course category
const updateCourseLesson = asyncHandler(async (req, res)=>{
    const { id } = req.params;
    validateMongodbId(id);

    const courseCat = await CourseLesson.findById(id);
    if(!courseCat){
        return res.status(400).json({
            status: false,
            message: "Course Category Not Found"
        })
    }

    try{
        if(req.body.title){
            req.body.slug = slugify(req.body.title.toLowerCase())
        }
        const courseCat = await CourseLesson.findByIdAndUpdate(id, req.body, {new: true});
        res.status(200).json({
            status: true,
            message: "Course Category Successfully Updated",
            courseCat,
        })
    }catch(error){
        throw new Error(error);
    }
});


module.exports = updateCourseLesson;