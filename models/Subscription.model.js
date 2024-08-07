import mongoose from 'mongoose';

const subscriptionSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    order_id: {
      type: String,
      default: function () {
        return Math.floor(10000000 + Math.random() * 90000000).toString() || '00000000';
      },
    },
    plan_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Plan',
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'active', 'paused', 'cancelled', 'disabled', 'expired'],
      default: 'pending',
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    refund_reasons: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Subscription', subscriptionSchema);
