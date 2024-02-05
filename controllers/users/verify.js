const User = require('../../models/users/userModel');
const asyncHandler = require('express-async-handler')

const verifyUser = asyncHandler(async (req, res)=>{
    const { token } = req.params;
    const userToBeVerified = await User.findOne({activationToken: token})

    if(!userToBeVerified){
        return res.status(404).json({
            status: false,
            message: "User not Found!"
        })
    }
    try{
        if(userToBeVerified && (userToBeVerified.isVerified === false)){
            userToBeVerified.isVerified = true;
            userToBeverified.activationToken = null
            await userToBeVerified.save()
            return res.status(200).json({
                status: true,
                message: "Verification Completed"
            })
        }else{
            return res.status(400).json({
                status: false,
                message: "User Already Verified"
            });
        }
    }catch(error){
        return res.status(500).json({
            status: false,
            message: "Internal Server Error"
        })
    }
});

module.exports = verifyUser;