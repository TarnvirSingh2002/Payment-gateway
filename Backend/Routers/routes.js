import express from "express";
import Stripe from "stripe";
const router = express.Router();

const stripe = Stripe(process.env.Secret_key); 

router.post('/create-payment-intent', async (req, res) => {
  const { amount, currency } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount, 
      currency, 
    });

    await Payment.create({
      userId,
      amount,
      currency,
      paymentIntentId: paymentIntent.id,
      status: 'processing',
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

export default router;
