import { configDotenv } from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"
import { connectDB } from "./db/connectDB.js";
import orderRouter from "./routes/order.route.js";
import authRouter from "./routes/auth.route.js";
import itemRouter from "./routes/item.route.js";


configDotenv()

const app = express()
const port = process.env.PORT 

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:["http://127.0.0.1:5500","http://localhost:5500"],
    credentials:true
}))

app.get("/",(req,res)=>{
    res.send("you are at root")
})

app.use("/api/auth",authRouter)
app.use("/api/order",orderRouter)
app.use("/api/item",itemRouter)



app.listen(port,()=>{
    console.log(`server is running at port : ${port}`);
    connectDB()
})