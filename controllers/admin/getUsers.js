const User = require('../../models/users/userModel');
const asyncHandler = require('express-async-handler');
const validateMongodbId  = require('../../configs/validateDB_id');


// Get all Users
const getAllUsers = asyncHandler(async (req, res)=>{
    try{
        const findAllUsers = await User.find();
        res.status(200).json({
            status: true,
            message: "All users fetched Successfully",
            findAllUsers,
        });

    }catch(error){
        throw new Error(error);
    }
});


module.exports = getAllUsers;