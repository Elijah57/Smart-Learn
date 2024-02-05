const User = require('../../models/users/userModel');
const asyncHandler = require('express-async-handler')
const crypto = require("crypto");

const verifyUser = asyncHandler(async (req, res)=>{
    const { token } = req.params;
    console.log(token)
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const userToBeVerified = await User.findOne({activationToken: hashedToken,})

    if(!userToBeVerified){
        return res.status(404).json({
            status: false,
            message: "User not Found!"
        })
    }
    try{
        if(userToBeVerified.activationTokenExpires < Date.now()){
            return res.status(410).json({
                status: false,
                message: "Verification link Expired"
            })
        }
        
        if(userToBeVerified && (userToBeVerified.isVerified === false)){
            userToBeVerified.activationToken = null;
            userToBeVerified.activationTokenExpires = null;
            userToBeVerified.isVerified = true;
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