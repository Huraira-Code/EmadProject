import React, { useState } from "react";
import { Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../Base_URL/BASE_URL";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ReservationData = ({ modal, setModal, date, time, size, day }) => {
  const [detail, setDetail] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [occassion, setOccassion] = useState("");
  const [request, setRequest] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const [reservationCompleted, setReservationCompleted] = useState(false); // Reservation completed state

  const navigate = useNavigate();

  const notifySuccess = (message) =>
    toast.success(message, {
      position: "bottom-right",
      autoClose: 6000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const notifyError = (message) =>
    toast.error(message, {
      position: "bottom-right",
      autoClose: 6000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const Confirmation = (e) => {
    e.preventDefault();

    if (!(fullName && phoneNumber && email && request)) {
      alert("fill all the fields...");
      return;
    }
    setDetail(true);
  };

  const ResvationComplete = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true

    const ReservatinData = {
      fullName,
      phoneNumber: parseInt(phoneNumber),
      email,
      occassion,
      request,
      ReservationDate: date,
      ReservationDay: day,
      ReservationTime: time,
      partySize: size,
    };
    // console.log("ReservatinData==>", ReservatinData);

    try {
      const res = await axios.post(`${BASE_URL}/tableData`, ReservatinData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      // console.log("res==>", res);
      notifySuccess("Reservation completed successfully!");
      notifySuccess("Accepted or rejected email will be sent to you shortly.");
      navigate("/");
      // Clear fields on success
      setFullName("");
      setPhoneNumber("");
      setEmail("");
      setOccassion("");
      setRequest("");
      setReservationCompleted(true); // Set reservation completed state to true
    } catch (error) {
      // console.log("error==>", error);
      notifyError("Failed to complete reservation.");
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  return (
    <>
      <Modal size="md" isOpen={modal} toggle={() => setModal(!modal)}>
        <ModalHeader toggle={() => setModal(!modal)}>
          {detail ? (
            <h1
              className="jacques-francois-shadow-regular"
              style={{ color: "rgb(295, 150, 0)" }}
            >
              Reservation Detail
            </h1>
          ) : (
            <h1 className="jacques-francois-shadow-regular">
              Reservation Data
            </h1>
          )}
        </ModalHeader>
        <ModalBody>
          {detail ? (
            <div className="playfair-display">
              <div className="pt-3 fs-4 ps-5 pb-5 fw-bold">
                <p>
                  {" "}
                  <CalendarMonthIcon
                    className="fs-1"
                    style={{ color: "rgb(295, 150, 0)" }}
                  />{" "}
                  <span className="ps-2">
                    {day} {date}
                  </span>
                </p>
                <p>
                  <AccessTimeIcon
                    className="fs-1"
                    style={{ color: "rgb(295, 150, 0)" }}
                  />
                  <span className="ps-3">{time}</span>
                </p>
                <p>
                  {" "}
                  <PermIdentityIcon
                    className="fs-1"
                    style={{ color: "rgb(295, 150, 0)" }}
                  />{" "}
                  <span className="ps-2">{size} people (Standard seating)</span>
                </p>
                <div className="pt-4">
                  <button
                    className="button py-3"
                    onClick={ResvationComplete}
                    disabled={loading || reservationCompleted} // Disable button when loading or reservation is completed
                  >
                    {loading ? "Processing..." : "Confirm Reservation"}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={Confirmation}>
              <Row>
                <div className="d-flex flex-column">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    style={{
                      padding: "10px",
                      marginBottom: "10px",
                      background: "transparent",
                      width: "100%",
                      borderRadius: "10px",
                      border: "2px solid rgb(295, 150, 0)",
                      fontSize: "15px",
                    }}
                  />
                  <input
                    type="number"
                    placeholder="Phone No."
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                    style={{
                      padding: "10px",
                      marginBottom: "10px",
                      background: "transparent",
                      width: "100%",
                      borderRadius: "10px",
                      border: "2px solid rgb(295, 150, 0)",
                      fontSize: "15px",
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{
                      padding: "10px",
                      marginBottom: "10px",
                      background: "transparent",
                      width: "100%",
                      borderRadius: "10px",
                      border: "2px solid rgb(295, 150, 0)",
                      fontSize: "15px",
                    }}
                  />
                  {/* <input
                    type="text"
                    placeholder="Select an Occasion"
                    value={occassion}
                    onChange={(e) => setOccassion(e.target.value)}
                    style={{
                      padding: "10px",
                      marginBottom: "10px",
                      background: "transparent",
                      width: "100%",
                      borderRadius: "10px",
                      border: "2px solid rgb(295, 150, 0)",
                      fontSize: "15px",
                    }}
                  /> */}
                  <select
                    value={occassion}
                    onChange={(e) => setOccassion(e.target.value)}
                    style={{
                      padding: "10px",
                      marginBottom: "10px",
                      background: "transparent",
                      width: "100%",
                      borderRadius: "10px",
                      border: "2px solid rgb(255, 150, 0)",
                      fontSize: "15px",
                    }}
                  >
                    <option value="" disabled>
                      Select an Occasion
                    </option>
                    <option value="birthday">Birthday</option>
                    <option value="wedding">Wedding</option>
                    <option value="anniversary">Anniversary</option>
                    <option value="graduation">Graduation</option>
                    <option value="other">Others</option>
                  </select>

                  <textarea
                    placeholder="Add a special Request.."
                    rows={3}
                    value={request}
                    onChange={(e) => setRequest(e.target.value)}
                    style={{
                      padding: "10px",
                      marginBottom: "10px",
                      background: "transparent",
                      width: "100%",
                      borderRadius: "10px",
                      border: "2px solid rgb(295, 150, 0)",
                      fontSize: "15px",
                    }}
                  />
                  <button className="button py-2 fs-4" type="submit">
                    Reservation
                  </button>
                </div>
              </Row>
            </form>
          )}
        </ModalBody>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default ReservationData;
