import React from "react";
import { Card, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";
const ErrorCheckout = () => {
  const navigate = useNavigate();
  return (
    <>
      <Card
        style={{
          maxWidth: 600,
          margin: "0 auto",
          marginTop: "70px",
          padding: "20px",
          borderRadius: "20px",
        }}
      >
        <CardContent>
          <div className="text-center jacques-francois-shadow-regular">
            <div>
              <img
                src="https://1000logos.net/wp-content/uploads/2024/01/Cross-Emoji.png"
                alt=""
                width="170px"
                height="100px"
              />
            </div>
            <h1 className="pt-4">Payment Error !</h1>
            <h5 className="pt-2 text-secondary">
              We are unable to complete your online payment..
            </h5>
            <h5>Have a great day!</h5>
            <div className="mt-4">
              <button
                className="btn btn-danger px-5 py-2 fs-5"
                onClick={() => navigate("/")}
              >
                Go Back
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default ErrorCheckout;
