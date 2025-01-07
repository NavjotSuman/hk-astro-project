import { Router } from "express";
import { deleteOrder, getAllOrders, updateOrderStatus } from "../controllers/order.controller.js";
import { protectedRoute } from "../middleware/protectedRoute.js";
import { createOrder, verifyPayment } from "../controllers/payment.controller.js";

const orderRouter = Router()

// apply route protection using JWT Token here
orderRouter.post("/createNewOrder",createOrder)
orderRouter.get("/getAllOrder",protectedRoute,getAllOrders)
orderRouter.post("/updateOrderStatus",protectedRoute,updateOrderStatus)
orderRouter.post("/deleteOrder/:orderId",protectedRoute,deleteOrder)
orderRouter.post("/verifyPayment",verifyPayment)


export default orderRouter