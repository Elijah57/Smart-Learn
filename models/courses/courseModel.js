const mongoose = require('mongoose');


const courseSchema = new mongoose.Schema({
    name: {
        required: true,
        unique: true,
        type: String,
        trim: true
    },
    description: {
        required: true,
        type: String,
        unique: true,
        trim: true
    },
    tags: [{
        type: String,
        trim: true
    }],
    imageUrl: {
        type: String,
        default: "https://e7.pngegg.com/pngimages/797/100/png-clipart-course-training-class-professional-certification-education-courses-miscellaneous-angle.png",
    },
    // lessons:[{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Module",
       
    // }],
    instructors_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    // students: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User",
    // }],
   
}, {timestamps: true});


module.exports = mongoose.model("Course", courseSchema);