const cloudinary = require("cloudinary").v2;

module.exports.uploadLessonsToCloudinary = async function (file){
    return new Promise((resolve, reject)=>{
        cloudinary.uploader.upload(file, 
            { resource_type: "video",
            folder: "Lesson_videos"
        }, (err, url)=>{
            if(err) return reject(err);
            return resolve(url)
        })
    })
}