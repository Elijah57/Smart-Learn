const express = require('express');
const { postCourseLesson, getAllCourseLesson, 
    getCourseLesson, deleteCourseLesson, updateCourseLesson } = require("../controllers/lessons/index");
const { isLoggedIn, isAdmin, isInstructor } = require("../middlewares/auth/index");

const courseLessonRouter = express.Router();

// post
courseLessonRouter.post("/course/:id/lesson/create", isLoggedIn, isInstructor, postCourseLesson);

// get
courseLessonRouter.get("/all", isLoggedIn, isInstructor, getAllCourseLesson);
courseLessonRouter.get("/:id", isLoggedIn, isInstructor, getCourseLesson);

// delete
courseLessonRouter.delete("/delete/:id", isLoggedIn, isInstructor, deleteCourseLesson);

// update
courseLessonRouter.put("/update/:id", isLoggedIn, isInstructor, updateCourseLesson);


module.exports = courseLessonRouter;