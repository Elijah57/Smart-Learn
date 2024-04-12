const User = require('../../models/users/userModel');
const asyncHandler = require('express-async-handler')
const validateMongodbId  = require('../../configs/validateDB_id')


const updateUser = asyncHandler(async (req, res)=>{

    const { _id } = req.user;
    const { firstname, lastname, profile} = req.body;

    validateMongodbId(_id); //validate id from config mongodb id validator
    try{
        const user = await User.findByIdAndUpdate(_id, {
            firstname,
            lastname,
            profile: {
                dob: profile["dob"],
                address: profile["address"],
                bio: profile["bio"],
                hobbies: profile["hobbies"],
                mobile_no: profile["mobile_no"],
                profession: profile["profession"],
                locale: profile["locale"]
            }

        }, {new: true});

        if(!user){
            return res.status(404).json({message: "User not found"});
        }

        res.status(200).json({
            status:true,
            message: "Profile updated successfully",
        });
    }catch(error){
        console.error("Error updating user", error);
        res.status(500).json({message:  "Internal Server Error"})
    }
});



module.exports = updateUser;