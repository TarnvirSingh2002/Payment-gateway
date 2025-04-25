import express from"express"
import cors from "cors"
import router from "./Routers/routes.js";
import { db } from "./db.js";
import env from "dotenv";
import Razorpay from "razorpay";
env.config();

const app= express();
app.use(express.json());
app.use(cors());

export const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_APT_SECRET,
  });

app.use("/api", router);

db();

app.listen(5000,()=>{
    console.log("Server at 5000");
})