import { Meal } from "../models/Meal.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";

const MealCard = asyncHandler(async (req, res) => {
  //Getting product Detail from frontend
  const { meal_id, mealCategory, mealTitle, mealDescription, mealPrice } =
    req.body;

  //checking validation
  if (
    !meal_id ||
    !mealCategory ||
    !mealTitle ||
    !mealDescription ||
    !mealPrice
  ) {
    throw new ApiError(400, "All Fields are required..!");
  }
  //Validation For Unique Product Id
  const existingMeal_id = await Meal.findOne({ meal_id: meal_id });
  if (existingMeal_id) {
    throw new ApiError(400, "Meal_id must be unique...");
  }
  //Image Handling
  // console.log(req.file);
  const imageLocalPath = req.file?.path;
  // console.log(imageLocalPath, "imageLocalPath");

  if (!imageLocalPath) {
    throw new ApiError(400, "meal_image is required...");
  }
  //upload on Cloudinary
  const image = await uploadOnCloudinary(imageLocalPath);
  if (!image.url) {
    throw new ApiError(400, "Failed to upload Image...");
  }
  //Sending to Database
  const meal = await Meal.create({
    meal_id: meal_id,
    meal_category: mealCategory,
    mealName: mealTitle,
    Description: mealDescription,
    Price: mealPrice,
    image: image.url,
  });
  // console.log(meal, "meal");

  //Sending to Frontend
  return res
    .status(201)
    .json(new ApiResponse(201, meal, "New meal upload successfully..."));
});

const GetMealCard = asyncHandler(async (req, res) => {
  const getMeal = await Meal.find({});

  return res
    .status(200)
    .json(new ApiResponse(200, getMeal, "Meal retreive successfully.."));
});

// const UpdateMealCard = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   try {
//     const { mealCategory, mealTitle, mealDescription, mealPrice, meal_id } =
//       req.body;

//     const updateData = {
//       meal_category: mealCategory,
//       mealName: mealTitle,
//       Description: mealDescription,
//       Price: mealPrice,
//       meal_id: meal_id,
//     };

//     if (req.file && req.file.image) {
//       const imageLocalPath = req.file?.path;
//       const image = await uploadOnCloudinary(imageLocalPath);
//       updateData.image = image;
//     }

//     const MealUpdate = await Meal.findByIdAndUpdate(id, updateData, {
//       new: true,
//     });

//     return res
//       .status(200)
//       .json(new ApiResponse(200, MealUpdate, "Meal Updated successfully.."));
//   } catch (error) {
//     console.log(error.message, "shdjksahdkjs");
//   }
// });
const UpdateMealCard = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const { mealCategory, mealTitle, mealDescription, mealPrice, meal_id } =
      req.body;

    const updateData = {
      meal_category: mealCategory,
      mealName: mealTitle,
      Description: mealDescription,
      Price: mealPrice,
      meal_id: meal_id,
    };
    // console.log("reFile", req.file);

    if (req.file) {
      const imageLocalPath = req.file.path;
      const image = await uploadOnCloudinary(imageLocalPath);
      // console.log(image.url, "url");

      if (image.url) {
        updateData.image = image.url; // Save only the URL string
      } else {
        throw new ApiError(400, "Failed to upload image to Cloudinary");
      }
    }

    const MealUpdate = await Meal.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true, // To validate the updated data
    });

    if (!MealUpdate) {
      throw new ApiError(404, "Meal not found");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, MealUpdate, "Meal Updated successfully.."));
  } catch (error) {
    // console.error("Update Meal Error:", error.message);
    res
      .status(error.statusCode || 500)
      .json(new ApiResponse(error.statusCode || 500, {}, error.message));
  }
});

const DeleteMealCard = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const MealDel = await Meal.findByIdAndDelete({ _id: id });
  return res
    .status(200)
    .json(new ApiResponse(200, MealDel, "Meal Deleted successfully.."));
});

export { MealCard, GetMealCard, UpdateMealCard, DeleteMealCard };
