const asyncHandler = require("express-async-handler")

// Not Found Error Handler

const notFound = asyncHandler(async (req, res, next) =>{
    const error = new Error(`Route Not Found: ${req.originalurl}`)
    res.status(404);
    next(error);
});

// Error Handler
const handleError = asyncHandler(async (err, req, res, next) =>{
    const errorCode = res.statusCode? res.statusCode : 500;
    res.status(errorCode);
    res.json({
        status: false,
        message: err?.message,
        stack: err?.stack,
    });
});

module.exports = {handleError, notFound};