const asyncHandler = require("express-async-handler");
const Course = require("../../models/courses/courseModel");


// course registration
const registerCourse = asyncHandler(async (req, res)=>{
    const { id } = req.params;
    const { _id } = req.user;

    const foundCourse = await Course.findById(id);
    if(!foundCourse){
        return res.status(400).json("Course Does not Exist");
    }
    try{
        foundCourse.students.push(_id);
        await foundCourse.save();
        res.status(200).json({
            status: true,
            message: `Successfully enrolled in ${foundCourse.title}`
        })
        }
    catch(error){
        return res.status(500).json({status: false, msg: "Internal Server Error"})
    }
});






module.exports = registerCourse;