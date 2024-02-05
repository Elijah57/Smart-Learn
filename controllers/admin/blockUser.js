const User = require('../../models/users/userModel');
const asyncHandler = require('express-async-handler');
const validateMongodbId  = require('../../configs/validateDB_id');


const blockUser = asyncHandler(async (req, res)=>{
    const {id} = req.params;
    validateMongodbId(id);
    try{
        const user = await User.findByIdAndUpdate(id,{isBlocked: true}, {new:true});
        res.status(200).json({
            status: true,
            message: "User Blocked Successfully"
        })
    }catch (error){
        throw new Error(error);
    }
});


module.exports = blockUser;