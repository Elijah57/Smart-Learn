const asyncHandler = require("express-async-handler");
const Course = require("../../models/courses/courseModel");
const slugify = require("slugify");



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




module.exports = updateCourse;