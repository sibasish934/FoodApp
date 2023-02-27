import ErrorHandler from "../utils/Error.js";

export const isAuthenicated = (req, res,next)=>{
    const token = req.cookies["connect.sid"];
    if(!token){
        return next(new ErrorHandler("PLease login", 401));
    }
    next();
}

export const isAdminAuthenicated = (req, res, next) =>{
    if(req.user.role != "admin"){
        return next(new ErrorHandler("Admin can access this info", 405));
    }
    next();
};