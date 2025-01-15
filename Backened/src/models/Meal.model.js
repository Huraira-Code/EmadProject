import mongoose from "mongoose";

const MealSchema = new mongoose.Schema(
  {
    meal_id: {
      type: String,

      unique: true,
    },
    meal_category: {
      type: String,
    },
    mealName: {
      type: String,
    },
    Description: {
      type: String,
    },
    Price: {
      type: Number,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Meal = mongoose.model("meal", MealSchema);
