export const errorMiddleWare = (err, req, res, next) =>{
    err.message = err.message || "Internal Server Error";
    err.statusCode = err.statusCode || 500;

    return res.status(err.statusCode).json({
        success:false,
        message:err.message,
    });
}

export const catchAsyncError = (passedFunction) => (req, res, next) =>{
    Promise.resolve(passedFunction(req, res, next)).catch(next);
};