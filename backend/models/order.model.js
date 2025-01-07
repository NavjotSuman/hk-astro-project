import mongoose from "mongoose";

// const orderSchema = new mongoose.Schema({
//     orderId:{
//         type:String,
//         required:true,
//         unique : true,
//     },
//     itemName:{
//         type:String,
//         required:true
//     },
//     itemPrice:{
//         type:Number,
//         required:true,
//     },
//     quantity:{
//         type:Number,
//         required:true
//     },
//     totalPrice:{
//         type:Number,
//         required:true
//     },
//     customerName:{
//         type:String,
//         required:true
//     },
//     customerEmail:{
//         type:String,
//     },
//     customerPhoneNumber:{
//         type:String,
//         required:true
//     },
//     customerAddress:{
//         type:String,
//         required:true
//     },
//     customerPincode:{
//         type: String,
//         required:true
//     },
//     isPaid:{
//         type: Boolean,
//         required: true,
//         default: false
//     },
//     orderStatus:{
//         type: String,
//         enum:["Pending","Completed","Cancelled"],
//         required: true,
//         default:"Pending"
//     }
// },{timestamps:true})

const orderSchema = new mongoose.Schema({
    orderId:{
        type:String,
        required:true,
        unique : true,
    },
    customerInfo: {
        customerName: {
            type: String,
            required: true,
        },
        customerEmail: {
            type: String,
            required: true,
        },
        customerPhoneNumber: {
            type: String,
            required: true,
        },
        customerAddress: {
            type: String,
            required: true,
        },
        customerPincode: {
            type: String,
            required: true,
        },
    },
    items: [
        {
            itemName:{
                type: String,
                required: true
            },
            itemId: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
            },
            itemQuantity: {
                type: Number,
                required: true,
                min: 1, // Ensures quantity is at least 1
            },
            itemPrice: {
                type: Number,
                required: true,
                min: 0, // Ensures price is non-negative
            },
            itemTotalPrice:{
                type: Number,
                required: true,
                min: 0, // Ensures price is non-negative
            }
        },
    ],
    totalPrice:{
        type: Number,
        required: true
    },
    isPaid:{
        type: Boolean,
        required: true,
        default: false
    },
    orderStatus:{
        type: String,
        enum:["Pending","Completed","Cancelled"],
        required: true,
        default:"Pending"
    }

},{timestamps:true})


const Order = mongoose.model("Order",orderSchema);
export default Order;