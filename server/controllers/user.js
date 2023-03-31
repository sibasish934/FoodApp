import { catchAsyncError } from "../middleware/errorMiddleware.js";
import { User } from "../models/userModel.js";
import {Order} from "../models/order.js";

export const myprofile = (req, res, next)=>{
    res.status(200).json({
        success:true,
        user:req.user,
    });
};

export const logout = (req, res, next)=>{
    req.session.destroy((err) =>{
        if(err) return next(err);

        res.clearCookie("connect.sid");
        res.status(200).json({
            message:"Logged Out",
        });
    });

}

export const getAllUsers = catchAsyncError(async(req, res, next)=>{
    const user = await User.find({});
    res.status(200).json({
        success:true,
        user,    
    })
})

export const getUserStats = catchAsyncError( async(req, res, next)=>{
    const userCount = await User.countDocuments();

    const orders = await Order.find({});

    const preparingOrders = orders.filter((ele)=> ele.orderStatus === "Preparing");
    const shippingOrders = orders.filter((ele)=> ele.orderStatus === "Shipped");
    const deliveredOrders = orders.filter((ele)=> ele.orderStatus === "Delivered");

    let amount = 0;

    orders.forEach((ele)=>{
        amount += ele.totalAmount;
    })

    res.status(200).json({
        success:true,
        userCount,
        ordersCount:{
            total : orders.length,
            preparing:preparingOrders.length,
            shipped:shippingOrders.length,
            delivered:deliveredOrders.length,
        },
        amount,
    })

})