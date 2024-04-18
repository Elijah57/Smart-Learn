const asyncHandler = require("express-async-handler")

// Not Found Error Handler

const notFound = asyncHandler(async (req, res, next) =>{
   
    const error = new Error(`Route Not Found: ${req.originalUrl}`)
    res.status(404).json({
        status: false,
        message: `Route Not Found: ${req.originalUrl}`,
    });
    next(error);
});

// Error Handler
const handleError = asyncHandler(async (err, req, res, next) =>{
    const errorCode = res.statusCode? res.statusCode : 500;
    res.status(errorCode).json({
        status: false,
        message: "Internal Sever Error"
    });
});

// class ErrorHandler extends Error {
    

    
// }

module.exports = {handleError, notFound};