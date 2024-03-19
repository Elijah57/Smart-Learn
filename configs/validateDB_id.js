const mongoose = require('mongoose');

const validateMongodbId = (id)=>{
    const is_valid = mongoose.Types.ObjectId.isValid(id);
    if(!is_valid) throw new Error('This Id is not valid or Not found')
};

module.exports = validateMongodbId;