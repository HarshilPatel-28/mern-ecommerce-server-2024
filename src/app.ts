import express from "express";
import { connectDB } from "./utils/features.js";
import { errorMiddleWare } from "./middlewares/error.js";
import NodeCache from "node-cache";
import {config} from 'dotenv'
import morgan from 'morgan'
import Stripe from "stripe";
import cors from "cors";


// importing Routes
import userRoute from './routes/user.js'
import productRoute from './routes/products.js'
import orderRoute from './routes/order.js'
import paymentRoute from './routes/payment.js'
import dashboardRoute from './routes/stats.js'

config({
    path:'./.env'
})


const port =process.env.PORT|| 4000;
const stripeKey =process.env.STRIPE_KEY|| "";

connectDB(process.env.MONGO_URI!);

export const stripe = new Stripe(stripeKey);
export const myCache = new NodeCache();

const app = express();

app.use(express.json())
app.use(morgan("dev"));
app.use(cors());

app.get("/", (req,res)=>{
    res.send("API working with /api/v1")
})

// Using Routes 
app.use("/api/v1/user",userRoute);
app.use("/api/v1/product",productRoute);
app.use("/api/v1/order",orderRoute);
app.use("/api/v1/payment",paymentRoute);
app.use("/api/v1/dashboard",dashboardRoute);

app.use("/uploads",express.static("uploads"));
app.use(errorMiddleWare)

app.listen(port,()=>{
    console.log(`server is working on http://localhost:${port}`);
    
})