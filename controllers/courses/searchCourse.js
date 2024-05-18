const asyncHandler = require("express-async-handler");
const Course = require("../../models/courses/courseModel");

// get a course detail
const searchCourse = asyncHandler(async (req, res)=>{
    const query = req.query.q;
    const { _id } = req.user;
  
    const searchRegex = new RegExp(`^${query}|${query}`, 'i');

    const courses = await Course.find({name: {$regex: searchRegex}});
    console.log(courses)
    if(courses.length === 0){
        return res.status(404).json({status: false, msg: "No result found"})
    }
    // const { students, instructors } = courses;
    res.status(200).json({
        status: true,
        message: "Course Fetched",
        courses,
     
    })

});


module.exports = searchCourse;