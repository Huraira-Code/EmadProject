import { Router } from "express";
import {
  DealCard,
  DeleteDealCard,
  EditDealCard,
  GetDealCard,
} from "../controllers/Deal.controller.js";

const router = Router();

router.route("/deal").post(DealCard);
router.route("/getDeal").get(GetDealCard);
router.route("/editDeal/:id").put(EditDealCard);
router.route("/delDeal/:id").delete(DeleteDealCard);
export default router;
