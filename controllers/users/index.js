const loginUser = require("./login");
const registerUser = require("./register");
const verifyUser = require("./verify")
const updateUser = require("./update");
const updatePassword = require("./updatePassword");
const forgotPasswordToken = require("./forgotPassword");
const resetPassword = require("./resetPassword");
const getMyProfile = require("./profile")

module.exports = {
    registerUser, 
    loginUser,
    verifyUser,
    updateUser, 
    updatePassword,
    forgotPasswordToken,
    resetPassword,
    getMyProfile
}