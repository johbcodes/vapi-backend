import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    dateJoined: { type: Date, default: Date.now },
    lastLogin: { type: Date },
    isActive: { type: Boolean, default: true },
    isStaff: { type: Boolean, default: false },
    firstName: { type: String },
    lastName: { type: String },
    phoneNumber: { type: String, required: true },
    address: { type: String },
    stripeCustomerId: { type: String },
    otp: { type: String },
    profile: { type: String },
    residential_address: { type: String },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
    refreshToken: { type: String },
    isVerified: { type: Boolean, default: false },
    smsVerificationAttempts: { type: Number, default: 0 },
    roles: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true },
    permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Permission' }],
  },
  { timestamps: true }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  if (this.isNew && !this.otp) {
    const generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
    this.otp = generatedOTP;
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.resetPassword = async function (newPassword) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(newPassword, salt);
  this.resetPasswordToken = undefined;
  this.resetPasswordExpires = undefined;
  await this.save();
};

userSchema.plugin(mongoosePaginate);
export default mongoose.model('User', userSchema);
