const express = require('express');
const { postCourse, getAllCourse, deleteCourse, searchCourse,
    courseDetail, registerCourse, updateCourse, myCourses } = require("../controllers/courses/index")
const { isLoggedIn, isAdmin, isInstructor } = require('../middlewares/auth/index')
const courseRouter = express.Router()

// post routes
courseRouter.post("/new", isLoggedIn, isInstructor, postCourse);
courseRouter.post("/:id/enroll", isLoggedIn, registerCourse)

// get routes
courseRouter.get("/courses", isLoggedIn, getAllCourse);
courseRouter.get("/courses/search?q=", isLoggedIn, searchCourse);
courseRouter.get("/:id/detail", isLoggedIn, courseDetail)
courseRouter.get("/my-courses", isLoggedIn, myCourses);

// delete route
courseRouter.delete("/:id/delete", isLoggedIn, isInstructor, deleteCourse)

// put routes
courseRouter.put("/:id/update", isLoggedIn, isInstructor, updateCourse);


module.exports = courseRouter;