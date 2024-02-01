const mongoose = require("mongoose");

let newsLetterSchema = new mongoose.Schema({
    email:{
        type: String,
        unique: true,
        required: true,

    }
},
{
    timestamps: true
})

module.exports = mongoose.model("NewsLetter", newsLetterSchema)