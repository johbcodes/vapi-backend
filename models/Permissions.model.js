import mongoose from 'mongoose';

const permissionsSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Permission', permissionsSchema);
