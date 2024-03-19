const fs = require("fs")

const purgeTempFiles =  async  function (filePath){
    fs.unlink(filePath, (err)=>{
        if (err) return;
    })
}

module.exports = purgeTempFiles;