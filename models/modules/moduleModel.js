const mongoose = require("mongoose")

const ModuleSchema = new mongoose.Schema({

    course_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"     
    },
    name : {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true
    },
    position: {
        type: Number,

    }
}, 
{
    timestamps: true
})

modules.exports = mongoose.Model("Module", ModuleSchema)