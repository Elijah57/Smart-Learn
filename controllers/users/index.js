const loginUser = require("./login");
const registerUser = require("./register");
const verifyUser = require("./verify")
const updateUser = require("./update");
const updatePassword = require("./updatePassword");
const forgotPasswordToken = require("./forgotPassword");
const resetPassword = require("./resetPassword");
const getMyProfile = require("./profile")
const verificationLink = require("./sendVerificationLink")
const getMyProfileId = require("./profileId");
const updateProfileImage = require("./updateProfileImage");
const registerInstructor = require("./registerInstructor");

module.exports = {
    registerUser, 
    loginUser,
    verifyUser,
    updateUser, 
    updatePassword,
    forgotPasswordToken,
    resetPassword,
    getMyProfile,
    verificationLink,
    updateProfileImage,
    getMyProfileId,
    registerInstructor
}