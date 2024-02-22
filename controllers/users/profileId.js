const User = require('../../models/users/userModel');
const asyncHandler = require('express-async-handler');


const getMyProfileId = asyncHandler(async (req, res)=>{
    const { id } = req.params;
    try{
        const user = await User.findById(id);
        res.status(200).json({
            status: true,
            message: "User Profile",
            user: user
        })
    }catch(error){
        throw new Error(error)
    }
})

module.exports = getMyProfileId;