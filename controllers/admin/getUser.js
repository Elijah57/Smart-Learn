const User = require('../../models/users/userModel');
const asyncHandler = require('express-async-handler');
const validateMongodbId  = require('../../configs/validateDB_id');

// Get a user
const getUser = asyncHandler(async (req, res)=>{
    const {id} = req.params;
    validateMongodbId(id);
    try{
        const user = await User.findById(id);
        res.status(200).json({
            status: true,
            message: "User Found",
            user,
        });
    }catch (error){
        throw new Error(error);
    }
});

module.exports = getUser;