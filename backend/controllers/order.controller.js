import Order from "../models/order.model.js";

// export const createOrder = async(req,res)=>{
//     try {
//         const {itemId, userInfo}=req.body;  
//         if (!itemId || !userInfo) {
//             return res.status(400).json({status:false,message:"itemId and UserInfo is required."})
//         }

//         const {customerName, customerEmail, customerPhoneNumber, customerAddress, customerPincode } = userInfo;
//         //fetch the item details here using itemId
//         const itemInfo = await mongoose.connection.db.collection('all-items').findOne({"_id":itemId});
//         if (!itemInfo) {
//             return res.status(404).json({status:false, message:"Item not found!"})
//         }
        

//         //get the price of item its name and generate a unique orderId also for all orders
//         const { itemPrice, itemName } = {itemPrice: 200, itemName: "newBook"}
//         console.log("itemPrice : ",itemPrice , "   itemName : ",itemName);
//         //run the payment gateway method here!!

//         //payment gateway success?

//         if (true) {
//             // write code to savinf the order in database
//             const newOrder = new Order({
//                 orderId:"1111",
//                 itemName:"xyz",
//                 userAddress:"dummy address",
//                 userPhoneNumber:"1234567890",
//                 itemPrice: 200,
//             })

//             if (newOrder) {
//                 newOrder.save()
//                 return res.status(201).json({success:true,message:"Order is created",order:newOrder})
//             }
//             return res.status(400).json({success:false,message:"order is not created"})
//         }
//         return res.status(400).json({success:false,message:"payment is not done!"})

//     } catch (error) {
//         console.log(`error occur at CreateOrder Controller : `,error);
//         return res.status(500).json({success:false,message:"Something went wrong!"})
//     }
// }


// -------------------------- Update Order Status-------------------------------------
export const updateOrderStatus = async(req,res)=>{
    try {
        console.log(req.body);
        const {orderId, orderStatus}=req.body;
        console.log("orderId : ",orderId);
        console.log("orderStatus : ",orderStatus);

        if (!orderId || !orderStatus) {
            return res.status(400).json({status:false,message:"orderId and orderStatus is required."})
        }
        //fetch the order details here using orderId
        const orderInfo = await Order.findById(orderId)
        console.log("orderInfo : ",orderInfo);
        if (!orderInfo) {
            return res.status(404).json({status:false,message:"Order not found!"})
        }
console.log("llllllll");
        if (orderStatus !== "Pending" && orderStatus !== "Completed" && orderStatus !== "Cancelled") {
            return res.status(400).json({status:false,message:"Wrong Status!!"})
        }
console.log("running ::: ");
        // add the status in the order info and save it
        const updatedOrder = await Order.updateOne({_id:orderId},{orderStatus: orderStatus})
        console.log("updatedOrder : ",updatedOrder);
       // send the success response if the updation is success 
       return res.status(200).json({success:true,message:"Order Status Updated",orderInfo:updatedOrder})

    } catch (error) {
        console.log(`error occur at updateOrderStatus Controller : `,error);
        return res.status(500).json({success:false,message:"Something went wrong!"})
    }
}


// --------------------- Fetch all records ----------------------------------
export const getAllOrders =async (req,res)=>{
    try {
        const orders = await Order.find().sort({ createdAt: -1 })
        if (orders) {
            return res.status(200).json({success:true,message:"orders fetched successfully",orders})
        }
        return res.status(200).json({success:false,message:"no order"})
        
    } catch (error) {
        console.log(`error occur at getAllOrders Controller : `,error);
        return res.status(500).json({success:false,message:"Something went wrong!"})
    }
} 



// -------------------- Delete Order -------------------------------------------

export const deleteOrder = async (req,res) => {
    try {
        const {orderId} = req.params

        if (!orderId) {
            return res.status(400).json({success:false,message:"orderId must be provided"})
        }

        // delete the order and send response order is deleted.
        await Order.findByIdAndDelete(orderId)

        return res.status(200).json({success:true,message:"Order deleted successfully."})
    } catch (error) {
        console.log(`error occur at deleteOrder Controller : `,error);
        return res.status(500).json({success:false,message:"Something went wrong!"})
    }
}

