import mongoose from 'mongoose';
import {Schema} from 'mongoose';

const paymentSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    default: 'usd',
  },
  paymentIntentId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['processing', 'succeeded', 'failed'],
    default: 'processing',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

export const Payment = mongoose.model('Payment', paymentSchema);
