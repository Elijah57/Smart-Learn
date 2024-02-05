const CourseLesson = require("../../models/lessons/courseLessonModel");
const Course = require("../../models/courses/courseModel")
const asyncHandler = require("express-async-handler");
const validateMongodbId = require("../../configs/validateDB_id");


const postCourseLesson = asyncHandler(async (req, res)=>{
    const {title} = req.body;
    const { id } = req.params;

    const isLesson = await CourseLesson.findOne({title: title});
    if(isLesson){
        return res.status(400).json({
            status:false,
            message: "Bad Request, Lesson already Exist"
        })
    }
    try{
        const newLesson = await CourseLesson.create(req.body);
        const foundCourse = await Course.findById(id);

        const { _id } = newLesson;
        foundCourse.lessons.push(_id);
        res.status(200).json({
            status: true,
            message: "Lesson Created Successfully"
        })

    }catch(error){
        throw new Error(error)
    }
});        

module.exports = postCourseLesson;