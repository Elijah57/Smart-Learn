const express = require('express');
const { getAllCourse, getCourse, registerCourse
    , updateCourse, myCourses } = require("../controllers/courses/index")
const { isLoggedIn } = require('../middlewares/auth/index')
const { getMyProfile } = require('../controllers/users/index')
const studentRouter = express.Router()

// post routes
studentRouter.post("/:id/enroll", isLoggedIn, registerCourse)

// get routes
studentRouter.get("/all-courses", isLoggedIn, getAllCourse);
studentRouter.get("/:id/detail", isLoggedIn, getCourse)
studentRouter.get("/my-courses", isLoggedIn, myCourses);
studentRouter.get("/profile", isLoggedIn, getMyProfile);




module.exports = studentRouter;