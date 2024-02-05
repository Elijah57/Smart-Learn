const asyncHandler = require("express-async-handler");
const Course = require("../../models/courses/courseModel");


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






module.exports = registerCourse;