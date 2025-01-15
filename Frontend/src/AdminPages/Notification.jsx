import React, { useEffect, useState } from "react";
import { Typography, CircularProgress } from "@mui/material";
import axios from "axios";
import { BASE_URL } from "../Base_URL/BASE_URL";
import { toast, ToastContainer } from "react-toastify";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

const Notification = () => {
  const [notifications, setNotification] = useState([]);
  const [notificationId, setNotificationId] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [notificationModal, setNotificationModal] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state

  const notifySuccess = (success) =>
    toast.success(success, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
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
      theme: "dark",
    });

  const getNotification = async () => {
    setLoading(true); // Set loading to true before fetching
    try {
      const response = await axios.get(`${BASE_URL}/getMessage`);
      setNotification(response.data.data);
      // console.log(response.data.data);
    } catch (error) {
      notifyError("Error while Loading Notification");
      // console.log(error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  const openModal = (id) => {
    setNotificationId(id);
    setNotificationModal(true);
  };

  const deleteNotification = async () => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/deleteMessage/${notificationId}`
      );
      // console.log(response.data);
      setRefresh(!refresh);
      notifySuccess("Notification Deleted Successfully");
      setNotificationModal(false);
    } catch (error) {
      notifyError("Error while Deleting Notification");
      // console.log(error);
    }
  };

  useEffect(() => {
    getNotification();
  }, [refresh]);

  return (
    <>
      <div className="container">
        <Modal
          size="md"
          isOpen={notificationModal}
          toggle={() => setNotificationModal(!notificationModal)}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
          contentClassName="custom-modal-content"
        >
          <ModalHeader toggle={() => setNotificationModal(!notificationModal)}>
            <h1 className="jacques-francois-shadow-regular text-danger">
              WARNING
            </h1>
            <p className="jacques-francois-shadow-regular">
              Are You Sure you want to delete?
            </p>
            <button
              onClick={() => setNotificationModal(false)}
              className="btn btn-secondary px-4 me-3"
            >
              No
            </button>
            <button
              onClick={() => deleteNotification()}
              className="btn btn-danger px-4"
            >
              Yes
            </button>
          </ModalHeader>
          <ModalBody></ModalBody>
        </Modal>
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
        <Typography
          className="text-center fw-bold jacques-francois-shadow-regular"
          variant="h4"
        >
          <span className="jacques-francois-shadow-regular">
            {" "}
            NOTIFICATIONS
          </span>
        </Typography>

        {loading ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "200px" }}
          >
            <CircularProgress />
          </div>
        ) : (
          <div className="row">
            {notifications.map((e, i) => {
              return (
                <div
                  key={i}
                  className="col-md-12 text-center border shadow mt-4 p-3 bg-dark text-white "
                  style={{ borderRadius: "10px", fontSize: "17px" }}
                >
                  <p>
                    <b className="jacques-francois-shadow-regular">NAME:</b>{" "}
                    {e.fullName ? e.fullName : e.firstName}
                  </p>
                  <p>
                    <b className="jacques-francois-shadow-regular">Email:</b>{" "}
                    {e.email}
                  </p>
                  <p>
                    <b className="jacques-francois-shadow-regular">Message:</b>{" "}
                    {e.message}
                  </p>
                  <p>
                    <b className="jacques-francois-shadow-regular">
                      Phone Number:
                    </b>{" "}
                    {e.phoneNumber}
                  </p>
                  <button
                    onClick={() => openModal(e._id)}
                    className="button w-100 fw-bold fs-4 "
                  >
                    <span className="playfair-display">Delete </span>
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default Notification;
