const asyncHandler = require("express-async-handler");
const Course = require("../../models/courses/courseModel");
const slugify = require("slugify");
const purgeTempFiles = require("../../utils/helpers/deleteTempFiles")

// create new course controller
const createCourse = asyncHandler(async (req, res)=>{

    const { _id } = req.user;
    const { name, description, tags } = req.body;
    const { image_url } = req;


    const course = await Course.findOne({name: name});
    if(course){
        return res.status(401).json({
            status: false,
            message: `Course with title "${name}" already Exists.`
        });
    }

    const data = {
        name: name,
        description: description,
        tags: tags,
        image_url: image_url,
    }
    
    const newCourse = await Course.create(data);
    newCourse.instructors_id.push(_id);
    await newCourse.save();

    return res.status(200).json({
        status: true,
        message: "Course Created Successfully",
        newCourse
    });

});



module.exports = createCourse;