import express from "express"
import { paymentt } from "../Schemas/payment.js";
import crypto from "crypto";
const router=express.Router();

router.post("/send",async (req, res)=>{
    const {amountt}=req.body;
    try {
        if(!amountt){
            res.status(400).send({
                message:"enter the amount"
            })}
        const options = {
            amount: amountt * 100,
            currency: "INR",
          };
          const order = await instance.orders.create(options);
        
          res.status(200).json({
            success: true,
            order
          });
        
    } catch (error) {
        res.status(500).send({message:"internal server error"})
    }
    
})


router.post("/paymentverification",async (req, res)=>{
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const expectedSignature = crypto

    .createHmac("sha256", process.env.RAZORPAY_APT_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {

    await paymentt.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    res.status(200).send({
      success:"true"
    });
  } else {
    res.status(400).json({
      success: false,
      });
    }
})
export default router;