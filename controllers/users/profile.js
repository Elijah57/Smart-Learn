const User = require('../../models/users/userModel');
const asyncHandler = require('express-async-handler');


const getMyProfile = asyncHandler(async (req, res)=>{
    const { _id } = req.user;
    try{
        const iuser = await User.findById(_id);
        return res.status(200).json({
            status: true,
            message: "User Profile",
            user: {
                firstname: iuser?.firstname,
                lastname: iuser?.lastname,
                email: iuser?.email,
                role: iuser?.roles,
                profile: iuser?.profile,
                emailVerified: iuser?.emailVerified,
            }
        })
    }catch(error){
        throw new Error(error)
    }
})

module.exports = getMyProfile;