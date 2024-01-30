const express = require('express');
const { postCourse, getAllCourse, deleteCourse, getCourse, registerCourse, updateCourse, myCourses } = require("../controllers/courseController")
const { isLoggedIn, isAdmin, isInstructor } = require('../middlewares/auth')
const courseRouter = express.Router()

// post routes
courseRouter.post("/new", isLoggedIn, isInstructor, postCourse);
courseRouter.post("/:id/enroll", isLoggedIn, registerCourse)

// get routes
courseRouter.get("/all-courses", isLoggedIn, getAllCourse);
courseRouter.get("/:id/detail", isLoggedIn, getCourse)
courseRouter.get("/my-courses", isLoggedIn, myCourses);

// delete route
courseRouter.delete("/:id/delete", isLoggedIn, isInstructor, deleteCourse)

// put routes
courseRouter.put("/:id/update", isLoggedIn, isInstructor, updateCourse);


module.exports = courseRouter;