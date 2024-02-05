const express = require('express');
const { registerUser, loginUser, updateUser, 
    updatePassword, forgotPasswordToken, resetPassword, verifyUser} = require('../controllers/users/index');
const { isLoggedIn } = require('../middlewares/auth/index');
const userRouter = express.Router()

// post routes
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/forgot-password", forgotPasswordToken);

// get routes
userRouter.get("/verify-email/:token", verifyUser)

// put routes
userRouter.put("/update-profile", isLoggedIn, updateUser);
userRouter.put("/update-password", isLoggedIn, updatePassword)
userRouter.put("/reset-password/:token", resetPassword)


module.exports = userRouter;