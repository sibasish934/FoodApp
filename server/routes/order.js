import express from "express";
import { getAdminOrder, myOrders, orderDetails, paymentVerification, placeOrder, placeOrderOnline, processOrder } from "../controllers/orderController.js";
import { isAdminAuthenicated, isAuthenicated } from "../middleware/auth.js";

const router = express.Router();

router.post("/createorder",isAuthenicated,placeOrder);
router.post("/createOrderOnline",isAuthenicated,placeOrderOnline);
router.post("/paymentVerify",isAuthenicated,paymentVerification);
router.get("/myOrders", isAuthenicated,myOrders);
router.get("/orderDetails/:id", isAuthenicated, orderDetails);
router.get("/Admin/Orders", isAuthenicated, isAdminAuthenicated, getAdminOrder);
router.get('/admin/Orders/:id', isAuthenicated, isAdminAuthenicated ,processOrder);
export default router;