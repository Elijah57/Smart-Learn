const asyncHandler = require("express-async-handler");
const Course = require("../../models/courses/courseModel");

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


module.exports = getCourse;