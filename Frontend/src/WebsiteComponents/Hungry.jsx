import React from "react";
import { useNavigate } from "react-router-dom";

const Hungry = () => {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="container bg-black"
        style={{
          border: "2px solid grey",
          marginTop: "150px",
          borderRadius: "50px",
        }}
      >
        <div
          className="text-center"
          style={{ paddingTop: "100px", paddingBottom: "100px" }}
        >
          <div>
            <h1
              className="jacques-francois-shadow-regular text-light"
              style={{ fontSize: "60px" }}
            >
              Hungry<span style={{ color: "rgb(295, 150, 0)" }}>?</span>We are
              Open now <span style={{ color: "rgb(295, 150, 0)" }}>...?</span>
            </h1>
          </div>

          {/* Responsive buttons */}
          <div className="d-flex flex-column flex-md-row justify-content-center pt-5">
            <button
              className="button px-5 py-3 fs-4 mb-3 mb-md-0"
              onClick={() => navigate("/menu")}
            >
              Order Now
            </button>
            <button
              className="button ms-md-3 px-5 py-3 fs-4"
              onClick={() => navigate("/reservation")}
            >
              Reservation
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hungry;
