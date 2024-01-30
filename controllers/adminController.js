const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const {generateToken} = require('../configs/jwt');
const validateMongodbId  = require('../configs/validateDB_id');


// Get all Users
const getAllUsers = asyncHandler(async (req, res)=>{
    try{
        const findAllUsers = await User.find();
        res.status(200).json({
            status: true,
            message: "All users fetched Successfully",
            findAllUsers,
        });

    }catch(error){
        throw new Error(error);
    }
});


// Get a user
const getUser = asyncHandler(async (req, res)=>{
    const {id} = req.params;
    validateMongodbId(id);
    try{
        const user = await User.findById(id);
        res.status(200).json({
            status: true,
            message: "User Found",
            user,
        });
    }catch (error){
        throw new Error(error);
    }
});


// delete a user
const deleteUser = asyncHandler(async (req, res)=>{
    const {id} = req.params;
    validateMongodbId(id);
    try{
        const user = await User.findByIdAndDelete(id);
        res.status(200).json({
            status: true,
            message: "User Deleted Successfully"
        });
    }catch (error){
        throw new Error(error)
    }
});

// block a User
const blockUser = asyncHandler(async (req, res)=>{
    const {id} = req.params;
    validateMongodbId(id);
    try{
        const user = await User.findByIdAndUpdate(id,{isBlocked: true}, {new:true});
        res.status(200).json({
            status: true,
            message: "User Blocked Successfully"
        })
    }catch (error){
        throw new Error(error);
    }
});

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

// unblock a user
const unBlockUser = asyncHandler(async (req, res)=>{
    const {id} = req.params;
    validateMongodbId(id);
    try{
        const user = await User.findByIdAndUpdate(id,{isBlocked: false}, {new:true});
        res.status(200).json({
            status: true,
            message: "User Unblocked Successfully"
        })
    }catch (error){
        throw new Error(error);
    }
});


module.exports = { getAllUsers, getUser, deleteUser, blockUser, unBlockUser, updateRole}