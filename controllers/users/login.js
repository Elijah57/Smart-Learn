const User = require('../../models/users/userModel');
const asyncHandler = require('express-async-handler')
const {generateToken} = require('../../utils/jwt/jwt');



const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Please provide both email and password" });
    }

    try {
        const findUser = await User.findOne({ email: email });
        if (!findUser) {
            return res.status(400).json({ status: false, message: "Incorrect Email or Password" });
        }

        const passwordMatched = await findUser.isPasswordMatched(password);

        if (passwordMatched) {
            return res.status(200).json({
                status: true,
                message: "Logged in Successfully",
                token: generateToken(findUser._id),
                user_id: findUser._id,
                role: findUser.roles,
                username: findUser.firstname + " " + findUser.lastname,
            });
        } else {
            return res.status(400).json({ status: false, message: "Incorrect Email or Password" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, message: "Internal Server Error" });
    }
});

module.exports = loginUser;
