import express from "express";
import bodyParser from 'body-parser';
import { stripe } from "../index.js";
const router = express.Router();

router.post(
  "/",
  bodyParser.raw({ type: "application/json" }), // ✅ RAW BODY HERE
  (req, res) => {
    const sig = req.headers["stripe-signature"];
    //this sign is used to verify the req.body wheather it is modified or not
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body, 
        sig, 
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.log(err);
      console.error("Webhook signature verification failed:", err.message);
      return res.sendStatus(400);
    }

    // ✅ Handle events
    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object;
      console.log(`✅ PaymentIntent ${paymentIntent.id} succeeded`);
    } else if (event.type === "payment_intent.payment_failed") {
      const paymentIntent = event.data.object;
      console.log(`❌ PaymentIntent ${paymentIntent.id} failed`);
    }

    res.sendStatus(200);
  }
);

export default router;