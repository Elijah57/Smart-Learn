const User = require('../../models/users/userModel');
const asyncHandler = require('express-async-handler');
const validateMongodbId  = require('../../configs/validateDB_id');


// delete a user
const deleteUser = asyncHandler(async (req, res)=>{
    const {id} = req.params;
    validateMongodbId(id);
    try{
        const user = await User.findByIdAndDelete(id);
        res.status(200).json({
            status: true,
            message: "User Deleted Successfully"
        });
    }catch (error){
        throw new Error(error)
    }
});


module.exports = deleteUser;