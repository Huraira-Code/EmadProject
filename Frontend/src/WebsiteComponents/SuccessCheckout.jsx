import { Card, CardContent } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const SuccessCheckout = () => {
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
                src="https://static-00.iconduck.com/assets.00/check-mark-button-emoji-2048x2048-lq7rf7h8.png"
                alt=""
                width="80px"
                height="80px"
              />
            </div>
            <h1 className="pt-4">Payment Done !</h1>
            <h5 className="pt-2 text-secondary">
              Thankyou for completing your secure online payment.
            </h5>
            <h5>Have a great day!</h5>
            <div className="mt-4">
              <button
                className="btn btn-success px-5 py-2 fs-5"
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

export default SuccessCheckout;
