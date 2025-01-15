import { Data } from "../models/Accepted&RejectedReservations.model.js";
import { Table } from "../models/TableReservation.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
// import nodemailer from "nodemailer";

const TableData = asyncHandler(async (req, res) => {
  const {
    fullName,
    phoneNumber,
    email,
    occassion,
    request,
    ReservationDate,
    ReservationDay,
    ReservationTime,
    partySize,
  } = req.body;

  try {
    // Checking validation
    if (
      !(
        fullName &&
        phoneNumber &&
        email &&
        occassion &&
        request &&
        ReservationDate &&
        ReservationDay &&
        ReservationTime &&
        partySize
      )
    ) {
      throw new ApiError(400, "All Fields are required..!");
    }

    const tableData = await Table.create({
      fullName,
      phoneNumber,
      email,
      occassion,
      request,
      ReservationDate,
      ReservationDay,
      ReservationTime,
      partySize,
    });

    return res
      .status(201)
      .json(new ApiResponse(200, tableData, "Table Data sent Successfully..."));
  } catch (error) {
    if (error.code === 11000) {
      // Handle duplicate key error
      return res
        .status(400)
        .json(new ApiResponse(400, null, "Duplicate key error"));
    }
    return res.status(500).json(new ApiResponse(500, null, error.message));
  }
});

const GetTableData = asyncHandler(async (req, res) => {
  try {
    const getTableData = await Table.find({});
    if (!getTableData) {
      throw new ApiError(400, "Table Data Not found");
    }

    return res
      .status(201)
      .json(
        new ApiResponse(
          200,
          getTableData,
          "Table Data retrieve Successfully..."
        )
      );
  } catch (error) {
    throw new ApiError(500, error);
  }
});

const DelTableData = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new ApiError(400, "Message ID is required... ...");
    }
    const delTableData = await Table.findByIdAndDelete({ _id: id });
    return res
      .status(201)
      .json(
        new ApiResponse(200, delTableData, "Tabale data delete Successfully...")
      );
  } catch (error) {
    throw new ApiError(500, error);
  }
});

// // Accepted and Rejected Reservation
// const Reservation = asyncHandler(async (req, res) => {
//   const { status } = req.body;
//   const { id } = req.params;
//   try {
//     if (!id) {
//       throw new ApiError(400, "Id Not found... ...");
//     }
//     // finding the data from table
//     const findData = await Table.findOne({ _id: id });
//     //sending data to the Accepted/Rejected Reservation
//     const ReservationStatus = await Data.create({
//       ReservationDate: findData.ReservationDate,
//       ReservationDay: findData.ReservationDay,
//       ReservationTime: findData.ReservationTime,
//       email: findData.email,
//       fullName: findData.fullName,
//       occassion: findData.occassion,
//       partySize: findData.partySize,
//       partySize: findData.partySize,
//       phoneNumber: findData.phoneNumber,
//       request: findData.request,
//       status: status,
//     });
//     //now delete from Table
//     await Table.findByIdAndDelete({ _id: id });
//     return res
//       .status(201)
//       .json(
//         new ApiResponse(
//           200,
//           ReservationStatus,
//           "Tabale data send Successfully to Accepted Reservation and deleted from tableReservation..."
//         )
//       );
//   } catch (error) {
//     throw new ApiError(500, error);
//   }
// });
const Reservation = asyncHandler(async (req, res, next) => {
  const { status } = req.body; // Accepted/Rejected status
  const { id } = req.params; // ID of the table reservation

  try {
    // Check if ID is provided
    if (!id) {
      return next(new ApiError(400, "Id not provided."));
    }

    // Find the reservation by ID in the Table collection
    const findData = await Table.findById(id);
    if (!findData) {
      return next(new ApiError(404, "Reservation not found."));
    }

    // Create a new reservation record with the accepted/rejected status
    const reservationStatus = await Data.create({
      ReservationDate: findData.ReservationDate,
      ReservationDay: findData.ReservationDay,
      ReservationTime: findData.ReservationTime,
      email: findData.email,
      fullName: findData.fullName,
      occasion: findData.occasion,
      partySize: findData.partySize,
      phoneNumber: findData.phoneNumber,
      request: findData.request,
      status: status, // Accepted or Rejected
    });

    // Delete the original reservation from the Table collection
    await Table.findByIdAndDelete(id);

    // Return success response
    return res
      .status(201)
      .json(
        new ApiResponse(
          201,
          reservationStatus,
          "Reservation successfully processed and removed from the Table collection."
        )
      );
  } catch (error) {
    // Handle unexpected errors
    next(new ApiError(500, error.message || "Internal Server Error."));
  }
});
const GetReservation = asyncHandler(async (req, res) => {
  try {
    const getReservation = await Data.find({});
    if (!getReservation) {
      throw new ApiError(400, "data not Found");
    }
    return res
      .status(201)
      .json(
        new ApiResponse(
          200,
          getReservation,
          "Action Data retrieve Successfully..."
        )
      );
  } catch (error) {
    throw new ApiError(500, "Server error, please try again later");
  }
});

export { TableData, GetTableData, DelTableData, Reservation, GetReservation };
