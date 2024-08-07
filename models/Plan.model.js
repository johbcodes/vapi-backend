import mongoose from 'mongoose';
const planSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: [String], required: true },
    features: { type: [Array], required: true },
    price: { type: Number, required: true },
    limits: { type: Object, required: true },
    stripePlanId: { type: String, required: true },
  },
  { timestamps: true }
);
export default mongoose.model('Plan', planSchema);
