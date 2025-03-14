import React, { useEffect, useState } from "react";
import reservation from "../Images/reservation.png";
import ReservationData from "./ReservationData";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Deals_Meals from "../WebsitePages/Deals_Meals";
const ReservationFrm = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [size, setSize] = useState("");
  const [modal, setModal] = useState(false); // Modal state
  const [secondModal, setSecondModal] = useState(false); //second Modal state
  const [dayOfWeek, setDayOfWeek] = useState(""); // State to hold day of the week
  const [formattedTime, setFormattedTime] = useState(""); // State to hold AM/PM formatted time
  const [confirmation, setConfirmation] = useState(false);

  const navigate = useNavigate();
  const notifyError = () =>
    toast.error("🦄 Fill all the fields!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  // Function to get day of the week from the selected date
  const getDayOfWeek = (dateString) => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dateObj = new Date(dateString);
    return days[dateObj.getDay()]; // Get the day of the week
  };

  // Function to convert 24-hour format time to 12-hour format with AM/PM
  const formatTime = (timeString) => {
    let [hours, minutes] = timeString.split(":");
    hours = parseInt(hours);
    const period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert to 12-hour format
    return `${hours}:${minutes} ${period}`;
  };

  const Reserve = (e) => {
    e.preventDefault();
    if (!date || !time || !size) {
      notifyError();
      return; // Stop execution if any field is missing
    } else {
      const dayOfWeek = getDayOfWeek(date); // Get day of the week
      const formattedTime = formatTime(time); // Get time in AM/PM format

      // Set the day of the week and formatted time in state
      setDayOfWeek(dayOfWeek);
      setFormattedTime(formattedTime);
      setConfirmation(true);
    }
  };

  return (
    <>
      <Modal
        size="md"
        isOpen={confirmation}
        toggle={() => setConfirmation(!confirmation)}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
        contentClassName="custom-modal-content"
      >
        <ModalHeader toggle={() => setConfirmation(!confirmation)}>
          <h1 className="jacques-francois-shadow-regular text-center ">
            <span style={{ color: "rgb(295, 150, 0)" }}>Confirmation</span>
          </h1>
        </ModalHeader>
        <ModalBody>
          <h5 className="text-center">Do you want to place Order Also?</h5>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              marginTop: "30px",
            }}
          >
            <button
              className="button px-5"
              // onClick={() => setConfirmation(!confirmation)}
              // onClick={() => navigate("/dealMeal") || setSecondModal(true)}
              onClick={() => {
                setSecondModal(!secondModal);
                // navigate("/dealMeal");
                // setTimeout(() => navigate("/dealMeal"), 100); // Ensure state updates first
              }}
              // onClick={handleDelete}
              // disabled={isLoading}
            >
              {/* {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Yes"
              )} */}
              Yes
            </button>
            <button
              className="button px-5"
              // onClick={() => setModal(true) || setConfirmation(!confirmation)}
              onClick={() => {
                setModal(true);
                setConfirmation(!confirmation);
              }}
            >
              No
            </button>
          </div>
        </ModalBody>
      </Modal>

      <div className="container" style={{ marginTop: "100px" }}>
        <section className="row">
          <div className="col-12 col-md-6">
            <div>
              <img src={reservation} height="700px" width="100%" alt="" />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="text-center">
              <h1
                className="jacques-francois-shadow-regular"
                style={{ fontSize: "70px", wordSpacing: "10px" }}
              >
                Book a table
              </h1>
            </div>
            <form onSubmit={Reserve}>
              <div className="d-flex flex-column mt-5">
                <input
                  type="date"
                  placeholder="Date"
                  className="mb-5"
                  onChange={(e) => setDate(e.target.value)}
                  style={{
                    padding: "35px",
                    background: "transparent",
                    width: "100%",
                    borderRadius: "10px",
                    border: "2px solid rgb(295, 150, 0)",
                    fontSize: "30px",
                  }}
                />
                <input
                  type="time"
                  placeholder="Time"
                  className="mb-5"
                  onChange={(e) => setTime(e.target.value)}
                  style={{
                    padding: "35px",
                    background: "transparent",
                    width: "100%",
                    borderRadius: "10px",
                    border: "2px solid rgb(295, 150, 0)",
                    fontSize: "30px",
                  }}
                />
                <input
                  type="Number"
                  placeholder="Party Size"
                  className="mb-5"
                  onChange={(e) => setSize(e.target.value)}
                  style={{
                    padding: "35px",
                    background: "transparent",
                    width: "100%",
                    borderRadius: "10px",
                    border: "2px solid rgb(295, 150, 0)",
                    fontSize: "30px",
                  }}
                />
                <button className="button py-2 fs-2" type="submit">
                  Book Now
                </button>
              </div>
            </form>
          </div>
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
        </section>
      </div>

      {/* Render the modal and pass the modal state */}
      {modal && (
        <ReservationData
          modal={modal}
          date={date}
          time={formattedTime} // Pass formatted AM/PM time
          size={size}
          day={dayOfWeek} // Pass day of the week
          setModal={setModal} // Pass setModal to toggle the modal from the child component
        />
      )}

      {/* secon Modal */}
      {secondModal && (
        <Deals_Meals
          secondModal={secondModal}
          date={date}
          time={formattedTime} // Pass formatted AM/PM time
          size={size}
          day={dayOfWeek}
          setSecondModal={setSecondModal}
        />
      )}
    </>
  );
};

export default ReservationFrm;
