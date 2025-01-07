import mongoose from "mongoose";
import { createRazorpayInstance } from "../config/razorpay.config.js";
import crypto from "crypto";
import Order from "../models/order.model.js";
import Item from "../models/item.model.js";

const razorpayInstance = createRazorpayInstance();

export const createOrder = async (req, res) => {
    try {
        const {userInfo, itemInfo} = req.body
        console.log("userInfo : ",userInfo);
        console.log("itemInfo : ",JSON.parse(itemInfo));
        let payableAmount = 0;
        // Parse itemInfo and fetch item details from the database
        const items = await Promise.all(
            JSON.parse(itemInfo).map(async (element) => {
                const item = await Item.findById(element._id)
                
                if (item) {
                    return {
                        _id: item._id,
                        itemName: item.name,
                        price: parseFloat(item.price),
                        quantity: element.quantity,
                        totalPrice: parseFloat(item.price) * element.quantity
                    };
                }
                return null; // Return null if the item is not found
            })
        );
        console.log("items : ",items);
        console.log("userInfo : ",userInfo);
        // Calculate payableAmount
        items.forEach((item) => {
            if (item) {
                payableAmount += item.price * item.quantity;
            }
        });
        console.log("Total Payable Amount:", payableAmount);
        const options = {
            amount: payableAmount * 100,
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
        };

        razorpayInstance.orders.create(options, async(err, order) => {
            if (err) {
                return res
                    .status(500)
                    .json({ success: false, message: "something went wrong." });
            }
            console.log("order = ",order.id);
            // create order in db.

            // Create order in the database
            const newOrder = new Order({
                orderId: order.id,
                customerInfo: {
                    customerName: userInfo.name,
                    customerEmail: userInfo.email,
                    customerPhoneNumber: userInfo.phone,
                    customerAddress: userInfo.address,
                    customerPincode: userInfo.pincode,
                },
                items: items.map((item) => ({
                    itemName: item.itemName,
                    itemId: item._id,
                    itemQuantity: item.quantity,
                    itemPrice: item.price,
                    itemTotalPrice: item.totalPrice,
                })),
                totalPrice: parseFloat(payableAmount),
                isPaid: false, // Default to unpaid
            });

            const savedOrder = await newOrder.save();
            console.log("Saved Order:", savedOrder);


            // Return the response
            return res.status(200).json({ 
                success: true, 
                order, 
                message: "Order created successfully.",
                _id: savedOrder._id
            });

        });
    } catch (error) {
        console.log("error at createOrder Controller : ", error);
        return res
            .status(500)
            .json({ success: false, message: "something went wrong." });
    }
};

export const verifyPayment = async(req, res) => {
    console.log("verifyPayment body = ", req.body);
    const { order_id, payment_id, signature } = req.body;

    const secret = process.env.RAZORPAY_KEY_SECRET;

    // create hmac object
    const hmac = crypto.createHmac("sha256", secret);

    hmac.update(order_id + "|" + payment_id);

    const generatedSignature = hmac.digest("hex");

    console.log("generatedSignature = ", generatedSignature);
    console.log("signature = ", signature);

    if (generatedSignature === signature) {
        // create order for the user
        const order = await Order.findOne({orderId:order_id})
        if (order) {
            await Order.findByIdAndUpdate(order.id,{isPaid : true})
        }
        console.log("order : ",order);
        const orderInfo = {
            itemInfo:order.items,
            userInfo:order.customerInfo,
            totalPrice:order.totalPrice,
            orderId:order.orderId
        }
        return res.status(200).json({ success: true, message: "Payment Verified",orderInfo });
    } else {
        return res
            .status(400)
            .json({ success: false, message: "Payment Not Verified" });
    }
};
