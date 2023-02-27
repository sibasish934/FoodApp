import app from "./app.js";
const Port = process.env.PORT;
import { connectDb } from "./config/database.js";
import Razorpay from "razorpay";
connectDb();

export const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET,
});


app.listen(Port , ()=>{
    console.log(`Server is working on this ${Port}, in ${process.env.NODE_ENV} mode`);
})