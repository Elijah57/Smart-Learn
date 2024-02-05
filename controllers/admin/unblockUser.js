const User = require('../../models/users/userModel');
const asyncHandler = require('express-async-handler');
const validateMongodbId  = require('../../configs/validateDB_id');

// unblock a user
const unBlockUser = asyncHandler(async (req, res)=>{
    const {id} = req.params;
    validateMongodbId(id);
    try{
        const user = await User.findByIdAndUpdate(id,{isBlocked: false}, {new:true});
        res.status(200).json({
            status: true,
            message: "User Unblocked Successfully"
        })
    }catch (error){
        throw new Error(error);
    }
});


module.exports = unBlockUser;