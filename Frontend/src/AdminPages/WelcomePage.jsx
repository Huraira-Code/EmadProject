import React from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
  const navigate = useNavigate();

  setTimeout(() => {
    navigate("/adminPortal/items");
  }, 5000);
  return (
    // <Box
    //   sx={{
    //     display: "flex",
    //     flexDirection: "column",
    //     alignItems: "center",
    //     justifyContent: "center",
    //     height: "100vh",
    //     textAlign: "center",
    //     backgroundColor: "rgb(295, 150, 0)",
    //     color: "black",
    //     padding: 3,
    //   }}
    // >
    //   <Typography
    //     variant="h2"
    //     component="h1"
    //     gutterBottom
    //     className="jacques-francois-shadow-regular"
    //   >
    //     Welcome to the Society Portal
    //   </Typography>
    //   <Typography
    //     variant="h5"
    //     component="p"
    //     className="jacques-francois-shadow-regular"
    //   >
    //     Manage your restaurant efficiently and effectively.
    //   </Typography>
    //   <Typography
    //     variant="h5"
    //     component="p"
    //     className="jacques-francois-shadow-regular"
    //   >
    //     You will redirecting to the dashboard in a few seconds...
    //   </Typography>
    // </Box>
    <div
      className="jacques-francois-shadow-regular"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
        backgroundColor: "rgb(295, 150, 0)",
        color: "black",
        padding: 3,
      }}
    >
      <h1
        style={{
          fontSize: "60px",
        }}
      >
        {" "}
        Welcome to the{" "}
        <b className="text-light">
          <u>Restaurant Portal</u>
        </b>
      </h1>
      <h1
        style={{
          fontSize: "30px",
          paddingTop: "20px",
        }}
      >
        {" "}
        Manage your Restaurant <u className="text-light">
          efficiently
        </u> and <u className="text-light">effectively</u>.
      </h1>
      <h1
        style={{
          fontSize: "20px",
        }}
      >
        {" "}
        You will redirecting to the dashboard in a few seconds...
      </h1>
    </div>
  );
};

export default WelcomePage;
