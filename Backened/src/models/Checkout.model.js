import mongoose from "mongoose";

const CheckoutSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    message: {
      type: String,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    orderItems: {
      type: Array,
      required: true,
    },
    status: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

export const Checkout = mongoose.model("checkout", CheckoutSchema);
