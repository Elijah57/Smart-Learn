const User = require('../../models/users/userModel');
const asyncHandler = require('express-async-handler')
const {generateToken} = require('../../utils/jwt/jwt');

const loginUser = asyncHandler(async (req, res)=>{
    const {email, password} = req.body;
    if(email === null)return res.status(400).json({message: "Email must be "});
    if ((typeof(password) !== "string") || (password === null) )return res.status(400).json({message: "Password invalid"});

    const findUser = await User.findOne({email: email});
    
    if (findUser && (await findUser.isPasswordMatched(password))){
        
        res.status(200).json({
            status:true,
            message: "Logged in Successfully",
            token: generateToken(findUser?._id),
            user_id: findUser?._id,
            role: findUser?.roles,
            username: findUser?.firstname +" "+ findUser?.lastname,
            user_image: findUser?.user_image,     
          })
    }else{
        throw new Error("Invalid Credentials")
    }
});

module.exports = loginUser;