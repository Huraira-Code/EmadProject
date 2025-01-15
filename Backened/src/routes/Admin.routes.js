import { Router } from "express";
import { LoginUser, RegisterUser } from "../controllers/Admin.controller.js";

const router = Router();
//This route will not integrated on Frontend
router.route("/regiter").post(RegisterUser);
//Integrated on Frontend
router.route("/login").post(LoginUser);

export default router;
