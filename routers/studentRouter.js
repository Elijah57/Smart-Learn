const express = require('express');
const { postCourse, getAllCourse, deleteCourse, getCourse, registerCourse, updateCourse, myCourses } = require("../controllers/courseController")
const { isLoggedIn, isAdmin, isInstructor } = require('../middlewares/auth')
const { getMyProfile } = require('../controllers/userController')
const studentRouter = express.Router()

// post routes
studentRouter.post("/:id/enroll", isLoggedIn, registerCourse)

// get routes
studentRouter.get("/all-courses", isLoggedIn, getAllCourse);
studentRouter.get("/:id/detail", isLoggedIn, getCourse)
studentRouter.get("/my-courses", isLoggedIn, myCourses);
studentRouter.get("/profile", isLoggedIn, getMyProfile);




module.exports = studentRouter;