import React from "react";
import Popular from "../Images/Popular.png";
import { useNavigate } from "react-router-dom";

const PopularDish = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="container" style={{ marginTop: "200px" }}>
        <section className="row">
          <div className="col-12 col-md-6" data-aos="fade-right">
            <div>
              <img src={Popular} height={450} width={450} alt="" />
            </div>
          </div>
          <div className="col-12 col-md-6 ps-3" data-aos="fade-left">
            <div>
              <h1
                className="jacques-francois-shadow-regular"
                style={{ fontSize: "70px" }}
              >
                Our Most Popular Dish
              </h1>
              <p
                style={{
                  fontSize: "20px",
                  lineHeight: "40px",
                  paddingTop: "20px",
                }}
              >
                This dish is full of flavor and nutrition! Quinoa is a complete
                protein, providing all the essential amino acids your body
                needs, and is also a good source of fiber.
              </p>
              <div>
                <button
                  className="button dancing-script"
                  style={{ fontSize: "25px", marginTop: "20px" }}
                  onClick={() => navigate("/menu")}
                >
                  Order Now
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default PopularDish;
