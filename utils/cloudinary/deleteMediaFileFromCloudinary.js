const cloudinary = require("cloudinary").v2;

module.exports.deleteFileFromCloudinary = async function (public_id){
    return new Promise((resolve, reject)=>{
        cloudinary.uploader.destroy(public_id, (err, done)=>{
            if(err) return reject(err);
            return resolve(done)
        })
    })
}