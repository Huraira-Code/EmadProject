import { Deal } from "../models/Deal.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

const DealCard = asyncHandler(async (req, res) => {
  //Getting deal Detail from frontend
  const { dealCategory, dealNumber, dealItems, dealPrice, deal_id, dealTitle } =
    req.body;
  //checking validation
  if (
    !(
      dealCategory &&
      dealNumber &&
      dealItems &&
      dealPrice &&
      deal_id &&
      dealTitle
    )
  ) {
    throw new ApiError(400, "All Fields are required..!");
  }
  const existingDeal = await Deal.findOne({
    $or: [{ deal_id: deal_id }, { dealNumber: dealNumber }],
  });

  if (existingDeal) {
    if (existingDeal.deal_id === deal_id) {
      throw new ApiError(400, "Deal_id must be unique...");
    }
    if (existingDeal.dealNumber === dealNumber) {
      throw new ApiError(400, "Deal_No must be unique...");
    }
  }

  const deal = await Deal.create({
    deal_id: deal_id,
    dealTitle: dealTitle,
    dealCategory: dealCategory,
    dealNumber: dealNumber,
    dealItems: dealItems,
    dealPrice: dealPrice,
  });
  return res
    .status(201)
    .json(new ApiResponse(200, deal, "New deal upload successfully..."));
});
const GetDealCard = asyncHandler(async (req, res) => {
  const getDeal = await Deal.find({});

  return res
    .status(200)
    .json(new ApiResponse(200, getDeal, "Deal retreive successfully.."));
});
const EditDealCard = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const {
      dealCategory,
      dealNumber,
      dealItems,
      dealPrice,
      deal_id,
      dealTitle,
    } = req.body;
    if (
      !(
        dealCategory &&
        dealNumber &&
        dealItems &&
        dealPrice &&
        deal_id &&
        dealTitle
      )
    ) {
      throw new ApiError(400, "All Fields are required..!");
    }

    const updateData = {
      deal_id: deal_id,
      dealTitle: dealTitle,
      dealCategory: dealCategory,
      dealNumber: dealNumber,
      dealItems: dealItems,
      dealPrice: dealPrice,
    };

    const UpdateDeal = await Deal.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    return res
      .status(200)
      .json(new ApiResponse(200, UpdateDeal, "Deal Updated successfully.."));
  } catch (error) {
    console.log("Update Deal..", error.message);
  }
});
const DeleteDealCard = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const delDeal = await Deal.findByIdAndDelete({ _id: id });
  return res
    .status(200)
    .json(new ApiResponse(200, "Deal Deleted successfully.."));
});

export { DealCard, GetDealCard, EditDealCard, DeleteDealCard };
