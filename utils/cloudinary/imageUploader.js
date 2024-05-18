const User = require('../../models/users/userModel');
const asyncHandler = require('express-async-handler');
const purgeTempFiles = require("../helpers/deleteTempFiles")
const cloudinary = require("cloudinary").v2;


const imageUploader = asyncHandler(async (req, res, next)=>{  
    if(!req.files.image){
        return res.status(400).json({msg: "No image file selected"})
    }
    
    const uploadedFile = req.files.image;
    const maxSize = 1024 * 1024;
    const uploadedFileSize = uploadedFile.size;
    const uploadedFilePath = uploadedFile.tempFilePath;
    
    if(!uploadedFile.mimetype.startsWith("image")){
        purgeTempFiles(uploadedFilePath);
        return res.status(400).json({msg: "uploaded file must be an Image"})
    }

    if(uploadedFileSize > maxSize){
        purgeTempFiles(uploadedFilePath);
        return res.status(413).json({msg: "Uploaded file must not exceed 1MB!"})
    }

    try{
        const result = await cloudinary.uploader.upload(uploadedFilePath, {
            folder: "course_thumbnail",
            use_filename: true,
            transformation: {
                width: 300,
                height: 200,
                crop: "fill"
            }
        });

        purgeTempFiles(uploadedFilePath);
        req.image_url = result.secure_url; 
        next();
   
    }catch(error){
        purgeTempFiles(uploadedFilePath);
        return res.status(422).json({
            msg: "upload failed, try again later"
        })
    }
});

module.exports = imageUploader;