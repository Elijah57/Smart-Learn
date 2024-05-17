const mongoose = require("mongoose");

var LessonSchema = new mongoose.Schema({
    module_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Module"
    },
    name: {
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
    position: {
        type: Number,
    },
},
{
    timestamps: true,
});

module.exports = mongoose.model("Lesson", LessonSchema);