import mongoose from "mongoose";

const verificationSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: true,
      unique: true,
    },
    otpExpiry: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Verification = mongoose.model("Verification", verificationSchema);
export default Verification;
