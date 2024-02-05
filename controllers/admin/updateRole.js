const User = require('../../models/users/userModel');
const asyncHandler = require('express-async-handler');
const validateMongodbId  = require('../../configs/validateDB_id');


const updateRole = asyncHandler(async (req, res)=>{
    const {id} = req.params;
    validateMongodbId(id);
    const { role } = req.body;
    try{
        const user = await User.findByIdAndUpdate(id, {roles: role}, {new: true});
        res.status(200).json({
            status: true,
            message: "User Role updated successfully"
        })
    }catch(error){
        throw new Error(error)
    }
})




module.exports = updateRole;