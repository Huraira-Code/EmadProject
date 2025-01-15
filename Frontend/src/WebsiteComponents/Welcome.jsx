import React from "react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();
  return (
    <>
      <div data-aos="flip-left">
        <div
          className="text-center"
          style={{
            paddingTop: "100px",
          }}
        >
          <div className="dancing-script">
            <h1>Delicious Experience</h1>
          </div>
          <div className="mt-5 ">
            <h1 style={{ fontSize: "50px" }}>
              " Welcome to{" "}
              <span
                className="jacques-francois-shadow-regular"
                style={{ color: "rgb(295, 150, 0)" }}
              >
                Savory Bite Restaurant
              </span>{" "}
              "
            </h1>
          </div>
          <div className="mt-5">
            <button
              className="button dancing-script me-5"
              onClick={() => navigate("/menu")}
            >
              Order Now
            </button>
            <button
              className="button dancing-script"
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

export default Welcome;
