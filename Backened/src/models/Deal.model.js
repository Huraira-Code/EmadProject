import mongoose from "mongoose";

const DealSchema = new mongoose.Schema(
  {
    deal_id: {
      type: Number,
      unique: true,
    },
    dealTitle: {
      type: String,
    },
    dealCategory: {
      type: String,
    },
    dealNumber: {
      type: Number,
    },
    dealItems: {
      type: Array,
    },
    dealPrice: {
      type: Number,
    },
  },
  { timestamps: true }
);

export const Deal = mongoose.model("deal", DealSchema);
