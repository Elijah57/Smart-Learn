const express = require('express');
const { registerUser, loginUser, updateUser, updatePassword, forgotPasswordToken, resetPassword} = require('../controllers/userController');
const { isAdmin, isLoggedIn } = require('../middlewares/auth');
const userRouter = express.Router()

// post routes
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/forgot-password", forgotPasswordToken);



// put routes
userRouter.put("/update-profile", isLoggedIn, updateUser);
userRouter.put("/update-password", isLoggedIn, updatePassword)
userRouter.put("/reset-password/:token", resetPassword)


module.exports = userRouter;