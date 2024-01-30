const mongoose = require('mongoose');


const dbConnect = ()=>{
    try{
        const connect = mongoose.connect(process.env.MONGODB_URI);
        console.log("Database connection successful");
        
    }catch (error){
        console.error(error);
    }
};

module.exports = dbConnect;