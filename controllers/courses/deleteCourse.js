const asyncHandler = require("express-async-handler");
const Course = require("../../models/courses/courseModel");


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




module.exports = deleteCourse;