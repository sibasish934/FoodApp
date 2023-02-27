import { catchAsyncError } from "../middleware/errorMiddleware.js";
import { Order } from "../models/order.js";
import ErrorHandler from "../utils/Error.js";
import { instance } from "../server.js";
import crypto from "crypto";
import {Payment} from "../models/payment.js";

export const placeOrder = catchAsyncError(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingCharges,
    totalAmount,
  } = req.body;

  const user = req.user._id; // here we can access the whole user data from the req user.

  const orderOptions = {
    shippingInfo,
    orderItems,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingCharges,
    totalAmount,
    user,
  };

  await Order.create(orderOptions);

  res.status(200).json({
    success: true,
    message: "Order Placed successFully",
  });
});

export const placeOrderOnline = catchAsyncError(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingCharges,
    totalAmount,
  } = req.body;

  const user = req.user._id;

  const orderOptions = {
    shippingInfo,
    orderItems,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingCharges,
    totalAmount,
    user,
  };

  const options = {
    amount: Number(totalAmount) * 100,
    currency: "INR",
  };
  const order = await instance.orders.create(options);

  res.status(201).json({
    success: true,
    order,
    orderOptions,
  });
});

export const paymentVerification = catchAsyncError(async (req, res, next) => {
  const {
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature,
    orderOptions,
  } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const exceptedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_API_SECRET).update(body).digest("hex");

  if(exceptedSignature === razorpay_signature){
    const payment = await Payment.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    await Order.create({
      ...orderOptions, paidAt:new Date(Date.now()),
      paymentInfo:payment._id,
    })

    res.status(201).json({
      success:true,
      message:"Order placed successfully."
    })
  }else{
    return next(new ErrorHandler("Payment Failed", 400));
  }

});

export const myOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find({
    user: req.user._id,
  }).populate("user", "name");

  res.status(200).json({
    success: true,
    orders,
  });
});

export const orderDetails = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate("user", "name");

  if (!order) {
    return next(new ErrorHandler("invalid Order id", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

export const getAdminOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.find({}).populate("user", "name");
  res.status(200).json({
    success: true,
    order,
  });
});

export const processOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order not Found", 404));
  }

  if (order.orderStatus === "Preparing") order.orderStatus = "Shipped";
  else if (order.orderStatus === "Shipped") {
    order.orderStatus = "Delivered";
    order.deliveredAt = new Date(Date.now());
  } else if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("Food Already delivered.", 400));
  }
  await order.save();
  res.status(200).json({
    success: true,
    message: "Order Status updated",
  });
});
