const asyncHandler = require("express-async-handler");
const Course = require("../../models/courses/courseModel");
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



module.exports = postCourse;