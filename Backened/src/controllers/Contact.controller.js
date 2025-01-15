import { Contact } from "../models/Contact.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

const ContactMessage = asyncHandler(async (req, res) => {
  //Getting Contact Detail from frontend
  const { fullName, email, phoneNumber, message } = req.body;

  //checking validation
  if (!(fullName && email && phoneNumber && message)) {
    throw new ApiError(400, "All Fields are required..!");
  }

  try {
    //Sending to Database
    const contact = await Contact.create({
      fullName,
      email,
      phoneNumber,
      message,
    });

    //Sending to Frontend
    return res
      .status(201)
      .json(new ApiResponse(200, contact, "Message send Successfully..."));
  } catch (error) {
    // Handle potential database or server errors
    throw new ApiError(500, "Server error, please try again later");
  }
});
const GetContactMessage = asyncHandler(async (req, res) => {
  try {
    const getContact = await Contact.find({});
    return res
      .status(201)
      .json(
        new ApiResponse(200, getContact, "Messages retrieved successfully...")
      );
  } catch (error) {
    throw new ApiError(500, "Server error, please try again later");
  }
});

const DeleContactMessage = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new ApiError(400, "Message ID is required... ...");
    }
    const delMessage = await Contact.findByIdAndDelete({ _id: id });
    return res
      .status(201)
      .json(
        new ApiResponse(200, delMessage, "Messages delete Successfully...")
      );
  } catch (error) {
    throw new ApiError(500, "Server error, please try again later");
  }
});

export { ContactMessage, GetContactMessage, DeleContactMessage };
