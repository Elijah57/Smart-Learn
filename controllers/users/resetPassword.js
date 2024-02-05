const User = require('../../models/users/userModel');
const asyncHandler = require('express-async-handler')
const crypto = require('crypto');


const resetPassword = asyncHandler(async (req, res)=>{
    const {password} = req.body;
    const { token } = req.params; 
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({passwordResetToken: hashedToken, passwordResetExpires: {$gt: Date.now()},});
    if (!user) throw new Error("Token Expired, Please try again");
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    res.status(200).json({
        status: true,
        message: "Password Reset Successful"
    })
});

module.exports = resetPassword;