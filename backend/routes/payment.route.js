import { Router } from "express";
import { createOrder, verifyPayment } from "../controllers/payment.controller.js";

const paymentRouter = Router()

paymentRouter.post("/createOrder",createOrder)
paymentRouter.post("/verifyPayment",verifyPayment)

export default paymentRouter