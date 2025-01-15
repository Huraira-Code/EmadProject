import React, { useState } from "react";
import RoomIcon from "@mui/icons-material/Room";
import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";
import { TextField } from "@mui/material";
import Navbar from "./Navbar";
import axios from "axios";
import { BASE_URL } from "../Base_URL/BASE_URL";
import Footer from "./Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [message, setMessage] = useState("");

  const ContactMessage = async () => {
    if (!name || !email || !number || !message) {
      notifyError();
    } else {
      const Message = {
        fullName: name,
        email,
        phoneNumber: number,
        message,
      };
      try {
        const response = await axios.post(`${BASE_URL}/message`, Message);
        // console.log(response.data);
        notifySuccess();
        // alert("Message sent successfully");

        // Reset the input fields
        setName("");
        setEmail("");
        setNumber("");
        setMessage("");
      } catch (error) {
        // console.log(error, "ERROR");
      }
    }
  };
  const notifySuccess = () =>
    toast.success("🦄 Your message has sent!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

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

  return (
    <>
      <div className="container mt-5">
        <section className="row">
          <div className="col-12 col-sm-6">
            <div className="mt-2">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d1809.9367193291498!2d67.0368898247519!3d24.868171809822833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sJama%20Masjid%20Muhamadi%2C%20Nizami%20Road%2C%20Jacob%20Lines%20Karachi!5e0!3m2!1sen!2s!4v1695509392524!5m2!1sen!2s"
                width="100%"
                height="470"
                style={{
                  borderRadius: "50px",
                }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          <div className="col-12 col-sm-6">
            <h1 className="fw-bold text-center mt-2 jacques-francois-shadow-regular">
              Send a Message
            </h1>
            <div className="inputBox">
              <TextField
                required
                className="my-2"
                label="FullName"
                placeholder="Name"
                value={name} // bind the value to the state
                onChange={(e) => setName(e.target.value)}
                variant="outlined"
                fullWidth
              />
              <TextField
                required
                className="my-2"
                label="Email"
                type="email"
                placeholder="Email"
                value={email} // bind the value to the state
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
                fullWidth
              />
              <TextField
                required
                className="my-2"
                label="Phone Number"
                type="number"
                placeholder="Number"
                value={number} // bind the value to the state
                onChange={(e) => setNumber(e.target.value)}
                variant="outlined"
                fullWidth
              />
              <TextField
                required
                label="Message"
                placeholder="Write your message here..."
                value={message} // bind the value to the state
                onChange={(e) => setMessage(e.target.value)}
                multiline
                rows={4}
                variant="outlined"
                fullWidth
              />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <button className="button mt-3 py-2" onClick={ContactMessage}>
                  Send message
                </button>

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
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ContactForm;
