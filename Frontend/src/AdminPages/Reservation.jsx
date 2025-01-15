import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Grid,
  TextField,
  InputAdornment,
} from "@mui/material";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { BASE_URL } from "../Base_URL/BASE_URL";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Reservation = () => {
  const [reservations, setReservations] = useState([]);
  const [reservationModal, setReservationModal] = useState(false);
  const [reservationId, setReservationId] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const notifySuccess = (success) =>
    toast.success(success, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const notifyError = (error) =>
    toast.error(error, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  // Get Reservations from the database
  const getReservations = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/getTableData`);
      console.log("getReservation", res.data.data);
      setReservations(res.data.data);
    } catch (error) {
      // console.log("error", error);
      notifyError(error.message);
    }
  };

  // Setting Delete Reservation Id
  const setIdForDeleteReservation = async (id) => {
    // console.log("id", id);
    setReservationId(id);
    setReservationModal(true);
  };

  // Delete Reservation from the database
  const deleteReservation = async () => {
    try {
      const res = await axios.delete(
        `${BASE_URL}/delTableData/${reservationId}`
      );
      notifySuccess("Reservation Deleted Successfully!!");
      setReservationModal(false);
      setRefresh(!refresh);
    } catch (error) {
      notifyError("Reservation Not Deleted!!");
      // console.log("error", error);
    }
  };

  // Accepted Reservation Function
  const acceptReservation = async (id) => {
    try {
      const res = await axios.post(`${BASE_URL}/acceptedReservation/${id}`);
      // console.log("res.data", res.data);
      notifySuccess("Reservation Accepted Successfully!!");
      setRefresh(!refresh);
    } catch (error) {
      notifyError("Reservation Not Accepted!!");
      // console.log("error", error);
    }

    try {
      const res = await axios.post(`${BASE_URL}/Acc&RejData/${id}`, {
        ReservationData: id,
        status: "Accepted",
      });
      // console.log("res.data", res.data);
      notifySuccess("Email Sent Successfully!!");
    } catch (error) {
      notifyError("Order Not Accepted!!");
      // console.log("error", error);
    }
  };

  // Rejected Reservation Function
  const rejectReservation = async (id) => {
    try {
      const res = await axios.post(`${BASE_URL}/rejectedReservation/${id}`);
      // console.log("res.data", res.data);
      notifyError("Reservation has Rejected !!");
      setRefresh(!refresh);
    } catch (error) {
      notifyError("Something went wrong while rejecting the Reservation!!");
      // console.log("error", error);
    }
    try {
      const res = await axios.post(`${BASE_URL}/Acc&RejData/${id}`, {
        ReservationData: id,
        status: "Rejected",
      });
      // console.log("res.data", res.data);
      notifyError("Email sent for rejecting Reservation!");
    } catch (error) {
      notifyError("Order Not Accepted!!");
      // console.log("error", error);
    }
  };

  // UseEffect to get Reservations
  useEffect(() => {
    getReservations();
  }, [refresh]);

  const filteredReservations = reservations.filter((reservation) =>
    reservation.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* Are you sure modal */}
      <Modal
        size="md"
        isOpen={reservationModal}
        toggle={() => setReservationModal(!reservationModal)}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center", // Vertically centers the modal
          height: "100vh", // Full viewport height to center vertically
        }}
        contentClassName="custom-modal-content" // For further customization
      >
        <ModalHeader toggle={() => setReservationModal(!reservationModal)}>
          <h1 className="jacques-francois-shadow-regular text-danger">
            WARNING
          </h1>
          <p>Are You Sure you want to delete?</p>
          <button
            onClick={() => setReservationModal(false)}
            className="btn btn-secondary me-3"
          >
            No
          </button>
          <button
            onClick={() => deleteReservation()}
            className="btn btn-danger"
          >
            Yes
          </button>
        </ModalHeader>
        <ModalBody></ModalBody>
      </Modal>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "10px",
          boxSizing: "border-box",
        }}
      >
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Card
          style={{
            width: "100%",
            maxWidth: "1000px", // Sets a max-width for larger screens
            margin: "0 auto",
            padding: "10px",
            border: "1px solid black",
            backgroundColor: "white",
            borderRadius: "10px",
          }}
        >
          <CardContent>
            <h1
              className="d-flex justify-content-start fw-bold jacques-francois-shadow-regular"
              style={{ fontSize: "42px", color: "rgb(295, 150, 0)" }}
            >
              Table Reservation
            </h1>
            <hr
              style={{
                height: "3px",
                color: "black",
                backgroundColor: "black",
              }}
            />

            {/* buttons */}
            <div className="d-flex justify-content-between jacques-francois-shadow-regular">
              <h1
                className="fw-bold pt-2 jacques-francois-shadow-regular"
                style={{ fontSize: "30px" }}
              >
                Total Reservations :{" "}
                <span style={{ color: "rgb(295, 150, 0)" }}>
                  {reservations.length}
                </span>
              </h1>

              <Grid item xs={5}>
                <TextField
                  label="Search"
                  placeholder="Reservor Name"
                  variant="outlined"
                  fullWidth
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                  InputLabelProps={{
                    style: { color: "rgb(295, 150, 0)" }, // Change label color to black
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "rgb(295, 150, 0)", // Change border color to black
                      },
                      "&:hover fieldset": {
                        borderColor: "rgb(295, 150, 0)",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "rgb(295, 150, 0)",
                      },
                    },
                    input: { color: "black" }, // Change input text color to black
                  }}
                />
              </Grid>
            </div>
            <hr
              style={{
                height: "3px",
                borderWidth: "0",
                color: "black",
                backgroundColor: "black",
              }}
            />

            {/* Table */}
            <div
              style={{
                marginTop: "10px",
                maxHeight: "220px",
                overflowY: "auto",
              }}
            >
              <table className="table table-striped ">
                <thead>
                  <tr className="jacques-francois-shadow-regular fs-5">
                    <th scope="col">#</th>
                    <th scope="col"> Name</th>
                    <th scope="col">Phone No.</th>
                    <th scope="col">Ocassion</th>
                    <th scope="col">Size</th>
                    <th scope="col">Date</th>
                    <th scope="col">Day</th>
                    <th scope="col">Time</th>
                    <th scope="col" className="text-center">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReservations.map((reservation, index) => {
                    return (
                      <tr key={index}>
                        <th scope="row" className="pt-3">
                          {index + 1}
                        </th>
                        <td className="pt-3">{reservation.fullName}</td>
                        <td className="pt-3">{reservation.phoneNumber}</td>
                        <td className="pt-3">{reservation.occassion}</td>
                        <td className="pt-3">{reservation.partySize}</td>
                        <td className="pt-3">{reservation.ReservationDate}</td>
                        <td className="pt-3">{reservation.ReservationDay}</td>
                        <td className="pt-3">{reservation.ReservationTime}</td>
                        <td className="pt-2">
                          <button
                            onClick={() => acceptReservation(reservation._id)}
                            className="btn btn-success"
                          >
                            Accepted
                          </button>
                          <button
                            onClick={() => rejectReservation(reservation._id)}
                            className="btn btn-danger ms-1"
                          >
                            Rejected
                          </button>
                        </td>
                        {/* <td className="pt-2">
                          {" "}
                          <button
                            onClick={() =>
                              setIdForDeleteReservation(reservation._id)
                            }
                            style={{
                              display: "inline-flex",
                              justifyContent: "center",
                              alignItems: "center",
                              border: "1px solid red",
                              borderRadius: "50%",
                              height: "40px", // Same fixed height
                              width: "40px", // Same fixed width
                              backgroundColor: "transparent", // No background
                              cursor: "pointer", // Pointer cursor for a button
                              marginLeft: "10px", // Add some spacing between the buttons
                            }}
                          >
                            <DeleteIcon className="text-danger" />
                          </button>
                        </td> */}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      <style>
        {`
          @media (max-width: 768px) {
            h1 {
              font-size: 28px;
            }
            .table th, .table td {
              font-size: 14px;
              padding: 8px;
            }
            .btn {
              font-size: 12px;
              
            }
          }
        `}
      </style>
    </>
  );
};

export default Reservation;
