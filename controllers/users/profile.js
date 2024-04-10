const User = require('../../models/users/userModel');
const asyncHandler = require('express-async-handler');


const getMyProfile = asyncHandler(async (req, res)=>{
    const { _id } = req.user;
    try{
        const user = await User.findById(_id);
        return res.status(200).json({
            status: true,
            message: "User Profile",
            user: {
                firstname: user?.firstname,
                lastname: user?.lastname,
                role: user?.roles,
                profile: user?.profile,
                isVerified: user?.emailVerified,
            }
        })
    }catch(error){
        throw new Error(error)
    }
})

module.exports = getMyProfile;