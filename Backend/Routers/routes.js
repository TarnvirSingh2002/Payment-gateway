import express from "express";
import { stripe } from "../index.js";
import { User } from "../Schemas/users.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { middle } from "../middle.js";
import { Payment } from "../Schemas/payment.js";
const router = express.Router();

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password || typeof password !== 'string') {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ error: 'User already exists.' });

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: 'User registered successfully.' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Server error' });
  }
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password)
      return res.status(400).json({ error: 'All fields are required.' });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid credentials.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials.' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/create-payment-intent', middle, async (req, res) => {
  const { amount, currency } = req.body;
  const { userId } = req;

  if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
    return res.status(400).send({ error: "Amount must be a positive number." });
  }
  if (!currency) {
    return res.status(400).send({ error: "Currency is required." });
  }

  try {
    const person = await User.findById(userId);
    if (!person) {
      return res.status(404).send({ error: "Invalid user!" });
    }

    let customerId = person.stripeCustomerId;

    if (!customerId) {
      // Create customer and store the ID
      const customer = await stripe.customers.create({
        name: person.name,
        // email: person.email, //it is optional
      });
      customerId = customer.id;
      person.stripeCustomerId = customerId;
      await person.save(); // save to DB
    }

    // 🔹 Create the PaymentIntent with the customer ID
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      customer: customerId, // it is not a name
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'never' // ✅ prevents redirect-required methods
      }
    });

    console.log(paymentIntent);
    await Payment.create({
      userId,
      amount,
      currency,
      paymentIntentId: paymentIntent.id,
      status: 'processing',
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

//working to confrm the payment
router.post('/confirm-payment', async (req, res) => {
  const { paymentIntentId } = req.body;

  try {
    // Confirm the payment intent
    // const paymentIntent = await stripe.paymentIntents.confirm(paymentIntentId);
     const paymentIntent = await stripe.paymentIntents.confirm(paymentIntentId, {
      payment_method: 'pm_card_visa',
      return_url: 'https://856c75fdd51f.ngrok-free.app/payment-complete'
    });
    res.status(200).send({ success: true, paymentIntent });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

export default router;
