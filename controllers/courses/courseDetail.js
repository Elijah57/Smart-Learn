const asyncHandler = require("express-async-handler");
const Course = require("../../models/courses/courseModel");

// get a course detail
const courseDetail = asyncHandler(async (req, res)=>{
    const { id } = req.params;
    const { _id } = req.user;
  
    // const searchRegex = new RegExp(`^${query}|${query}`, 'i');
    
    const course = await Course.findById(id);
    if(!course){
        return res.status(400).json({
            status: false,
            msg: "course does not exist"
        })
    }
    const { students, instructors } = course;
    res.status(200).json({
        status: true,
        message: "Course Fetched",
        course,
        students,
        instructors
    })
    
});


module.exports = courseDetail;