const asyncHandler = require("express-async-handler")
const NewsLetter = require("../models/newsLetterModels")
const validateMongodbId = require("../configs/validateDB_id");


const subscribe = asyncHandler(async (req, res)=>{
    try{
        const newEmail = await NewsLetter.create(req.body);
        res.status(200).json({
            status: true,
            message: "Subscribed to NewsLetter"
        })
    }catch(error){
        throw new Error(error);
    }
})

const unsubscribe = asyncHandler(async (req, res)=>{
    const { id } = req.params;
    try{
        const deleteEmail = await NewsLetter.findByIdAndDelete(id);
        res.status(200).json({
            status: true,
            message: "Unsubscribed to NewsLetter!"
        })

    }catch(error){
        throw new Error(error);
    }
})


module.exports = {subscribe, unsubscribe}