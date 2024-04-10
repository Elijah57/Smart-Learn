const postCourse = require("./postCourse");
const deleteCourse = require("./deleteCourse");
const courseDetail = require("./courseDetail");
const getAllCourse = require("./getCourses");
const registerCourse = require("./enrollCourse");
const updateCourse = require("./updateCourse")
const myCourses = require("./myCourses")
const searchCourse = require("./searchCourse")

module.exports = { postCourse, deleteCourse, courseDetail, updateCourse, getAllCourse, registerCourse, searchCourse, myCourses};