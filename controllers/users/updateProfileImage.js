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
        // delete the previous image from cloud
        const public_id = req.user.user_image.public_id;
        cloudinary.uploader.destroy(public_id,()=>{ console.log("Updated")} );
        
        const user = await User.findById(_id);
        user.user_image.url = result.secure_url; 
        user.user_image.public_id = result.public_id;
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