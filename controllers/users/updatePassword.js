const User = require('../../models/users/userModel');
const asyncHandler = require('express-async-handler')
const validateMongodbId  = require('../../configs/validateDB_id');

const updatePassword = asyncHandler(async (req, res)=>{
    const { _id } = req.user;
    const { password } = req.body;

    validateMongodbId(_id);
    try{
        const user = await User.findById(_id);
        if (user && (await user.isPasswordMatched(password))){
            throw new Error("Put in a new password")
        }else{ //if new password is given
            user.password = password; //update user password
            await user.save();
            res.status(200).json({
                status: true,
                message: "Password Updated Successfully"
            })
        }

    }catch (error){
        throw new Error(error);
    }
});

module.exports = updatePassword;