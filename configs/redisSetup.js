const Redis = require("ioredis");
require("dotenv").config();

const redisClient = ()=>{
    if(process.env.REDIS_URL){
        const redis = new Redis(process.env.REDIS_URL);
    }
    else{
        throw new Error();
    }
}

module.exports = redisClient;