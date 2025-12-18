import express from"express"
import cors from "cors"
import { db } from "./db.js";
import env from "dotenv";
import router from "./Routers/routes.js";
import Stripe from "stripe";
import webHook from "./Routers/webRouter.js"
env.config();

const app= express();
app.use(cors());

export const stripe = new Stripe(process.env.SECKRET_KEY);

db();

app.use('/api/payment/web',webHook); //this is neither called by the frontend or by the backend it is call by the stripe when there is an event occur!
app.use(express.json());
app.use('/api/payment', router);

app.listen(5000, () => console.log('Server running on port 5000'));