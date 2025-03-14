import { Router } from "express";
import { upload } from "../middlewares/Multer.middleware.js";
import {
  DeleteMealCard,
  GetMealCard,
  MealCard,
  UpdateMealCard,
} from "../controllers/Meal.controller.js";

const router = Router();

//Integrated On Frontend UploadMeal.jsx Component
// router
//   .route("/meal")
//   .post(upload.fields([{ name: "image", maxCount: 1 }]), MealCard);
router.route("/meal").post(upload.single("image"), MealCard);
// router.route("/meal").post(MealCard);
//Integrated On Frontend UploadMeal.jsx Component
router.route("/getMeal").get(GetMealCard);
//Integrated On Frontend UploadMeal.jsx Component
router.route("/updateMeal/:id").put(upload.single("image"), UpdateMealCard);
//Integrated On Frontend UploadMeal.jsx Component
router.route("/delMeal/:id").delete(DeleteMealCard);
export default router;
