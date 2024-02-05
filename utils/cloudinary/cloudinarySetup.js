const cloudinary = require("cloudinary").v2;

export async function uploadToCloudinary(file){
    return new Promise((resolve, reject)=>{
        cloudinary.uploader.upload(file, { resource_type: "video"}, (err, url)=>{
            if(err) return reject(err);
            return resolve(url)
        })
    })
}

export async function deleteFileFromCloudinary(public_id){
    return new Promise((resolve, reject)=>{
        cloudinary.uploader.destroy(public_id, (err, done)=>{
            if(err) return reject(err);
            return resolve(done)
        })
    })
}