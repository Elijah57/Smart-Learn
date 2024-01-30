const asyncHandler = require("express-async-handler");
const Course = require("../models/courseModel");
const slugify = require("slugify");

// create new course controller
const postCourse = asyncHandler(async (req, res)=>{
    const { title, description } = req.body;
    const { _id } = req.user;
    const course = await Course.findOne({title: title});
    if(course){
        return res.status(400).json({
            status: false,
            message: "Course with this Title already Exists."
        });
    }
    try{
        const newCourse = await Course.create({title, description});
        newCourse.instructors.push(_id);
        await newCourse.save();
        res.status(200).json({
            status: true,
            message: "Course Created Successfully",
            newCourse
        });
    }catch(error){
        throw new Error(error);
    }
});

// update Course controller
const updateCourse = asyncHandler(async (req, res)=>{
    const { title, description } = req.body;
    const { id } = req.params;

    const course = await Course.findById(id);
    if(!course){
        return res.status(400).json({
            status: false,
            message: "Course Does not exist Exists."
        })
    }
    try{
        const updateCourse = await Course.findByIdAndUpdate(id, {title, description}, {upsert: true, new: true});
        res.status(200).json({
            status: true,
            message: "Course Updated Successfully"
        });
    }catch(error){
        throw new Error(error);
    }
});

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

// course registration
const registerCourse = asyncHandler(async (req, res)=>{
    const { id } = req.params;
    const { _id } = req.user;

    const isFoundCourse = await Course.findById(id);
    if(!isFoundCourse){
        return res.status(400).json("Course Does not Exist");
    }
    try{
        isFoundCourse.students.push(_id);
        await isFoundCourse.save();
        res.status(200).json({
            status: true,
            message: "Course Enrollment Successful"
        })
        }
    catch(error){
        throw new Error(error);
    }
});

// delete a created course controller
const deleteCourse = asyncHandler(async (req, res)=>{
    const { id } = req.params;
    const { _id } = req.user
    const isCourse = await Course.findById(id);
    const instructorsList = isCourse.instructors;
    try{
        if(!(instructorsList.includes(_id))){
            return res.status(400).json("You are not Allowed to perform some action");
        }
        const course = await Course.findByIdAndDelete(id);
        res.status(200).json({
            status: true,
            message: "Course Deleted Successfully"
        })
        }catch(error){
        throw new Error(error);
    }
});

// get a course detail
const getCourse = asyncHandler(async (req, res)=>{
    const { id } = req.params;
    const { _id } = req.user;
  
    try{
        const iscourse = await Course.findById(id);
        const { students, instructors } = iscourse;
        res.status(200).json({
            status: true,
            message: "Course Fetched",
            iscourse,
            students,
            instructors
        })
    }catch(error){
        throw new Error(error);
    }
});

// get my-courses
const myCourses = asyncHandler(async (req, res)=>{
    const { _id, roles } = req.user;
    try{
        const allCourses = await Course.find();
        
        if (roles === "instructor"){

            const courseTaught = allCourses.filter((courseItem)=>{
                courseItem.instructors.includes(_id)
            })
            const data = { roles, courseTaught}
            return res.status(200).json({
                status: true,
                data:  data
            });
        }else if(roles === "user"){

            const courseEnrolled = allCourses.filter((courseItem)=>{
                courseItem.students.includes(_id);
            });
            const data = { roles, courseEnrolled }
            res.status(200).json({
                status: true,
                data:  data
            });
        }
    }catch(error){
        throw new Error(error);
    }
});


module.exports = { postCourse, deleteCourse, getCourse, updateCourse, getAllCourse, registerCourse, myCourses};