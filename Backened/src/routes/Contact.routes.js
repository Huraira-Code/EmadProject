import { Router } from "express";
import {
  ContactMessage,
  DeleContactMessage,
  GetContactMessage,
} from "../controllers/Contact.controller.js";

const router = Router();
//Integrated On frontend ContactForm.jsx Component
router.route("/message").post(ContactMessage);
//Integrated On frontend Notification.jsx Component
router.route("/getMessage").get(GetContactMessage);
//Integrated On frontend Notification.jsx Component
router.route("/deleteMessage/:id").delete(DeleContactMessage);

export default router;
