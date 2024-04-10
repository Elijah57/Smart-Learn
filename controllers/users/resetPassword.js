const User = require('../../models/users/userModel');
const asyncHandler = require('express-async-handler')
const crypto = require('crypto');


const resetPassword = asyncHandler(async (req, res)=>{
    const {password} = req.body;
    const { token } = req.params; 
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({passwordResetToken: hashedToken,}); // passwordResetExpires: {$gt: Date.now()}

    if (!user){
        return res.status(404).json({
            status: false,
            message:  "Invalid or Expired Token"
        });
    }
    if (user && (user.passwordResetExpires > Date.now())){

        user.password = password;
        user.passwordResetToken = null;
        user.passwordResetExpires = null;
        await user.save();
        res.status(200).json({
            status: true,
            message: "Password Reset Successful"
        })
    }else{
        return res.status(400).json({
            status: false,
            message: "Password Reset Link has expired"
        })
    }
});

module.exports = resetPassword;