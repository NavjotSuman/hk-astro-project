import mongoose from "mongoose";

export const connectDB = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connected to database :",conn.connection.name);
    } catch (error) {
        console.log("error at DB Connect : ",error);
    }
   
}
