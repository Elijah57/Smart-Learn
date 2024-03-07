const cloudinary = require("cloudinary").v2;

module.exports.uploadProfileImageToCloudinary = async function (file){
    return new Promise((resolve, reject)=>{
        cloudinary.uploader.upload(file, 
            { resource_type: "video",
            folder: "profile_images",
            width: 150
},      (err, url)=>{
            if(err) return reject(err);
            return resolve(url)
        })
    })
}

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

module.exports.deleteFileFromCloudinary = async function (public_id){
    return new Promise((resolve, reject)=>{
        cloudinary.uploader.destroy(public_id, (err, done)=>{
            if(err) return reject(err);
            return resolve(done)
        })
    })
}