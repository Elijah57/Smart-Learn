const CourseLesson = require("../models/courseLessonModel");
const Course = require("../models/courseModel")
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const validateMongodbId = require("../configs/validateDB_id");


// create a course category

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

// delete course category
const deleteCourseLesson = asyncHandler(async (req, res)=>{
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
        const courseCat = await CourseLesson.findByIdAndDelete(id);
        res.status(200).json({
            status: true,
            message: "Course Category Successfully Deleted"
        })
    }catch(error){
        throw new Error(error);
    }

});

module.exports = { postCourseLesson, deleteCourseLesson, updateCourseLesson, getAllCourseLesson, getCourseLesson}