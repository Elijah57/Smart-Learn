const User = require('../../models/users/userModel');
const asyncHandler = require('express-async-handler')
const validateMongodbId  = require('../../configs/validateDB_id')


const updateUser = asyncHandler(async (req, res)=>{
    const { _id } = req.user;
    validateMongodbId(_id); //validate id from config mongodb id validator
    try{
        const user = await User.findByIdAndUpdate(_id, req.body, {new: true});
        res.status(200).json({
            status:true,
            message: "Profile updated successfully",
        });
    }catch(error){
        throw new Error(error);
    }
});


module.exports = updateUser;