import { Router } from "express";
import {
  DelCheckoutData,
  CheckoutData,
  GetCheckoutData,
  OrderTransfer,
  paymentMethod,
  GetTransfer,
} from "../controllers/Checkout.controller.js";

const router = Router();
//Some Issues Which need to be discuss
router.route("/checkout").post(CheckoutData);
// Integrated on Frontend TotalOrders.js Component
router.route("/getcheckout").get(GetCheckoutData);
// Integrated on Frontend TotalOrders.js Component
router.route("/delcheckout/:id").delete(DelCheckoutData);
router.route("/orderTransfer/:id").post(OrderTransfer);
router.route("/allOrders").get(GetTransfer);
//Integrated on Frontend
router.route("/online-payment").post(paymentMethod);

export default router;
