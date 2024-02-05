const postCourse = require("./postCourse");
const deleteCourse = require("./deleteCourse");
const getCourse = require("./getCourse");
const getAllCourse = require("./getCourses");
const registerCourse = require("./enrollCourse");
const updateCourse = require("./updateCourse")
const myCourses = require("./myCourses")

module.exports = { postCourse, deleteCourse, getCourse, updateCourse, getAllCourse, registerCourse, myCourses};