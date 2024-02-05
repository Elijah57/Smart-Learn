const asyncHandler = require("express-async-handler");
const Course = require("../../models/courses/courseModel");

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


module.exports = myCourses;