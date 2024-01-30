const mongoose = require("mongoose");

var courseLessonSchema = new mongoose.Schema({
    topic: {
        type: String,
        require: true,
        unique: true,
        trim: true
    },
    content: {
        type: String,
        trim: true
    },
    videoUrl: {
        type: String,
        default: "https://e7.pngegg.com/pngimages/797/100/png-clipart-course-training-class-professional-certification-education-courses-miscellaneous-angle.png"
    },
    isComplete: {
        type: Boolean,
        default: false,
},
},
{
    timestamps: true,
});

module.exports = mongoose.model("CourseLesson", courseLessonSchema);