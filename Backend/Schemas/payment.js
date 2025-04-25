import mongoose from "mongoose";
const {Schema} = mongoose;

const payment= new Schema({
    razorpay_order_id: {
        type: String,
        required: true,
      },
      razorpay_payment_id: {
        type: String,
        required: true,
      },
      razorpay_signature: {
        type: String,
        required: true,
      },
});
export const paymentt = mongoose.model("paymentt", payment);