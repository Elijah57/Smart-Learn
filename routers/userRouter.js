const express = require('express');
const { registerUser, loginUser, updateUser, verificationLink,
    updatePassword, forgotPasswordToken, resetPassword, verifyUser, updateProfileImage, getMyProfile} = require('../controllers/users/index');
const { isLoggedIn } = require('../middlewares/auth/index');
const userRouter = express.Router()

// post routes
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/forgot-password", forgotPasswordToken);

// get routes
userRouter.get("/verify-email/:token", verifyUser);
userRouter.get("/request-verification", isLoggedIn, verificationLink);
userRouter.get("/profile-dashboard", isLoggedIn, getMyProfile);

// put routes
userRouter.put("/update-profile", isLoggedIn, updateUser);
userRouter.put("/upload-profile-image", isLoggedIn, updateProfileImage);
userRouter.put("/update-password", isLoggedIn, updatePassword)
userRouter.put("/reset-password/:token", resetPassword)

// userRouter.delete("/delete/:id")

module.exports = userRouter;