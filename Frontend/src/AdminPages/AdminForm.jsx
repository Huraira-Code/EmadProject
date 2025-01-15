import * as React from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@mui/material";
// import { ToastContainer } from "react-toastify";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginIcon from "@mui/icons-material/Login";
import axios from "axios";
import { BASE_URL } from "../Base_URL/BASE_URL";
export default function AdminForm() {
  const navigate = useNavigate();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const notifyFieldsError = (error) =>
    toast.error(error, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  const notifyInvalidError = (error) =>
    toast.error(error, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      notifyFieldsError("🦄 Please fill all The fields!");
    } else {
      const adminData = {
        email: email,
        password: password,
      };
      // console.log(adminData, "adminData");
      try {
        const response = await axios.post(`${BASE_URL}/login`, {
          email: email,
          password: password,
        });
        // console.log(response, "adminLogin");
        if (response) {
          localStorage.setItem("uid", email);
          navigate("/adminPortal/welcome");
        }
      } catch (error) {
        // console.log(error.message);
        notifyInvalidError(error.message);
      }
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        backgroundImage: `url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D')`,
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        style={{
          maxWidth: 450,
          margin: "0 auto",
          padding: "20px",
          border: "2px solid white",
          backgroundColor: "rgba(255, 255, 255, 0.3)",
          backdropFilter: "blur(5px)", // Apply blur to the background
          borderRadius: "10px",
        }}
        className="jacques-francois-shadow-regular"
      >
        <CardContent>
          <h1
            className="d-flex justify-content-center text-white mb-4 fw-bold"
            style={{ fontSize: "42px" }}
          >
            Restaurant Admin
          </h1>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid xs={12} item>
                <TextField
                  required
                  label="AdminEmail"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  variant="outlined"
                  fullWidth
                  InputLabelProps={{
                    style: { color: "white" }, // Change label color to white
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "white", // Change border color to white
                      },
                      "&:hover fieldset": {
                        borderColor: "white",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "white",
                      },
                    },
                    input: { color: "white" }, // Change input text color to white
                  }}
                />
              </Grid>
              <Grid xs={12} item>
                <TextField
                  required
                  label="AdminPassword"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  variant="outlined"
                  fullWidth
                  type="password" // Ensure the password is masked
                  InputLabelProps={{
                    style: { color: "white" }, // Change label color to white
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "white", // Change border color to white
                      },
                      "&:hover fieldset": {
                        borderColor: "white",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "white",
                      },
                    },
                    input: { color: "white" }, // Change input text color to white
                  }}
                />
              </Grid>
              <Grid
                xs={12}
                marginTop={2}
                item
                style={{ display: "flex", justifyContent: "center" }}
              >
                <button
                  className="btn btn-outline-light px-5 fs-5 fw-bold border-2"
                  type="submit"
                >
                  Log In <LoginIcon />
                </button>
              </Grid>
            </Grid>
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
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
