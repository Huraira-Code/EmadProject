import { Checkout } from "../models/Checkout.model.js";
import { Table } from "../models/TableReservation.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import sendMail from "../utils/Nodemailer.js";

const AcceptedOrder = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    // Fetch the order details by ID
    const AccOrder = await Checkout.findById(id);
    console.log("AccOrder", AccOrder);

    // Error handling if order is not found
    if (!AccOrder) {
      throw new ApiError(400, "Order not found..!");
    }

    // Check if orderItems exists and has at least one item
    if (!AccOrder.orderItems || AccOrder.orderItems.length === 0) {
      throw new ApiError(400, "No items found in the order..!");
    }

    const sub = "Order Accepted";
    const msg = `Dear ${AccOrder.firstName} ${AccOrder.lastName},\n\nYour order of ${AccOrder.orderItems[0].title} has been confirmed. \n\nThank you for choosing us!\n\nBest regards,\nSavory Bites Restaurant`;
    sendMail(AccOrder.email, sub, msg);

    return res
      .status(201)
      .json(
        new ApiResponse(
          200,
          "success",
          "The email has been sent successfully for the accepted order..."
        )
      );
  } catch (error) {
    res.status(500).send("Error from API: " + error.message);
  }
});
const RejectedOrder = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    // Fetch the order details by ID
    const RejOrder = await Checkout.findById(id);

    // Error handling if order is not found
    if (!RejOrder) {
      throw new ApiError(400, "Order not found..!");
    }
    const sub = "Order Rejected";
    const msg = `Dear ${RejOrder.firstName} ${
      RejOrder.lastName
    },\n\nYour order of ${
      RejOrder.orderItems[0].title // Assuming `orderItems` is an array and accessing the first item
    } has been rejected due to some issues. \n\nThank you for choosing us!\n\nBest regards,\nSavory Bites Restaurant`;
    sendMail(RejOrder.email, sub, msg);

    return res
      .status(201)
      .json(
        new ApiResponse(
          200,
          "success",
          "The email has sent successfully for rejected order..."
        )
      );
  } catch (error) {
    res.send(error.message);
  }
});

const AcceptedReservation = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const AccReservation = await Table.findById(id);
    if (!AccReservation) {
      throw new ApiError(400, "reservation not found..!");
    }

    const sub = "Reservation Accepted";
    const msg = `Dear ${AccReservation.fullName},\n\nYour reservation for
      ${AccReservation.partySize} people on ${AccReservation.ReservationDate} at ${AccReservation.ReservationTime}
       has been confirmed. \n\nThank you for choosing us!\n\n Best regards,\nSavory Bites Restaurant,
 `;

    sendMail(AccReservation.email, sub, msg);
    return res
      .status(201)
      .json(
        new ApiResponse(
          200,
          "success",
          "The email has sent successfully for accepted Reservation..."
        )
      );
  } catch (error) {
    res.send(error.message);
  }
});

const RejectedReservation = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const RejReservation = await Table.findById(id);
    if (!RejReservation) {
      throw new ApiError(400, "data not found..!");
    }

    const sub = "Reservation Rejection";
    const msg = `Dear ${RejReservation.fullName},\n\nYour reservation for
      ${RejReservation.partySize} people on ${RejReservation.ReservationDate} at ${RejReservation.ReservationTime}
       has been rejected due to some issues. \n\nThank you for choosing us!\n\nBest regards,\nSavory Bites Restaurant,
 `;

    sendMail(RejReservation.email, sub, msg);
    return res
      .status(201)
      .json(
        new ApiResponse(
          200,
          "success",
          "The email has sent successfully for rejected reservation..."
        )
      );
  } catch (error) {
    res.send(error.message);
  }
});

export {
  AcceptedOrder,
  RejectedOrder,
  AcceptedReservation,
  RejectedReservation,
};
