const User = require('../../models/users/userModel');
const asyncHandler = require('express-async-handler')
const {generateToken} = require('../../utils/jwt/jwt');



const loginUser = asyncHandler(async (req, res)=>{
    const {email, password} = req.body;
    if(email === null)return res.status(400).json({message: "Please provide your Email"});
    if ((typeof(password) !== "string") || (password === null) )return res.status(400).json({message: "Password invalid"});
    try{
        const findUser = await User.findOne({email: email});
        if(!findUser){
            return res.status(400).json({status: false,
                message:"Incorrect Email or Password"})
        }

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
            return res.status(400).json({status: false,
                message:"Incorrect Email or Password"})
        }
    }catch(error){
        return;
    }
});

module.exports = loginUser;