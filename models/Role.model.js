import mongoose from 'mongoose';

const roleSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },

    permissions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Permission',
        unique: true,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model('Role', roleSchema);
