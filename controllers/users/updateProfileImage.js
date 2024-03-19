const User = require('../../models/users/userModel');
const asyncHandler = require('express-async-handler');
const purgeTempFiles = require("../../utils/helpers/deleteTempFiles")
const cloudinary = require("cloudinary").v2;


const updateUserProfileImage = asyncHandler(async (req, res)=>{
    const { _id } = req.user;
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
            folder: "profile_images",
            use_filename: true,
            transformation: {
                width: 300,
                height: 200,
                crop: "fill"
            }
        });

        purgeTempFiles(uploadedFilePath);
        const public_id = req.user.image_pubId;
        cloudinary.uploader.destroy(public_id,()=>{ console.log("Updated")} );
        
        const user = await User.findById(_id);
        user.user_image = result.secure_url; 
        user.image_pubId = result.public_id;
        user.save();
        
        return res.status(200).json({
            msg: "profile image uploaded successfully",
            src: result.secure_url
        })

    }catch(error){
        purgeTempFiles(uploadedFilePath);
        return res.status(422).json({
            msg: "upload failed, try again later"
        })

    }
})

module.exports = updateUserProfileImage;