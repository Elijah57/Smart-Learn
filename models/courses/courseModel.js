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
        trim: true
    },
    tags: [{
        type: String,
        trim: true
    }],
    image_url: {
        type: String,
        default: "https://e7.pngegg.com/pngimages/797/100/png-clipart-course-training-class-professional-certification-education-courses-miscellaneous-angle.png",
    },
    preview_video: {
        type: String,
        
    }, 
 
    instructors_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    
    }]
    
   
}, {timestamps: true});


module.exports = mongoose.model("Course", courseSchema);