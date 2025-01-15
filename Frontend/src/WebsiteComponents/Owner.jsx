import React from "react";
import owner from "../Images/owner.png";

const Owner = () => {
  return (
    <>
      <div className="container">
        <section className="row">
          {/* Image Section */}
          <div className="col-12 col-md-6 d-flex justify-content-center">
            <div style={{ marginTop: "150px" }}>
              <img
                src={owner}
                className="img-fluid"
                alt="Owner"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  borderRadius: "10px",
                }}
              />
            </div>
          </div>

          {/* Text Section */}
          <div className="col-12 col-md-6 d-flex align-items-center">
            <div style={{ marginTop: "50px", textAlign: "center" }}>
              <h1
                className="jacques-francois-shadow-regular"
                style={{ fontSize: "60px", wordSpacing: "5px" }}
              >
                <span style={{ color: "rgb(295, 150, 0)" }}>Owner</span> &
                Executive Chef
              </h1>
              <h1 className="text-secondary jacques-francois-shadow-regular">
                Ismail Marzuki
              </h1>
              <p
                className="fs-2 pt-4"
                style={{ lineHeight: "60px", fontStyle: "italic" }}
              >
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua."
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Owner;
