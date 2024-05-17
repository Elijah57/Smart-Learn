const mongoose = require("mongoose")


const EnrollmentSchema = mongoose.Schema({

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    course_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    },
    enrollment_date: {
        type: Date
    },
    status: {
        type: String,
        enum: ["active", "completed", "withdrawn"]
    },
    progress: {
        type: Number
    }    
}, 
{
    timestamps: true
})


module.exports = mongoose.Model("Enrollment", EnrollmentSchema)