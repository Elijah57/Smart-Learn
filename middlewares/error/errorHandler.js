const asyncHandler = require("express-async-handler")

// Not Found Error Handler

const notFound = asyncHandler(async (req, res, next) =>{
    const error = new Error(`Route Not Found: ${req.originalurl}`)
    res.status(404).json({
        status: false,
        message: process.env.ENV === "DEV"? error?.stack : "Route not Found",
        stack: process.env.ENV === "DEV"? error?.stack : "",
    });
    next(error);
});

// Error Handler
const handleError = asyncHandler(async (err, req, res, next) =>{
    const errorCode = res.statusCode? res.statusCode : 500;
    res.status(errorCode);
    res.json({
        status: false,
        message: process.env.ENV === "DEV"? err?.stack : "Route ",
        stack: process.env.ENV === "DEV"? err?.stack : ""
    });
});

// class ErrorHandler extends Error {
    

    
// }

module.exports = {handleError, notFound};