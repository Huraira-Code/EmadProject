import React from "react";
import about from "../Images/about.png";
import about2 from "../Images/about2.png";
import { useNavigate } from "react-router-dom";
const AboutOurRestaurant = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="container">
        <section className="row">
          <div className="col-12 col-md-7 d-flex justify-content-center">
            <div
              className="text-center"
              style={{
                marginTop: "150px",
              }}
            >
              <img
                src={about}
                width={300}
                height={300}
                style={{
                  border: "2px solid red",
                  borderRadius: "50%",
                  boxShadow: "0px 0px 0px 50px  rgba(117, 112, 112, 0.274)",
                }}
                alt=""
              />
            </div>
          </div>
          <div className="col-12 col-md-5">
            <div style={{ marginTop: "100px" }}>
              <h1
                className="jacques-francois-shadow-regular"
                style={{ fontSize: "60px", wordSpacing: "20px" }}
              >
                About Our{" "}
                <span style={{ color: "rgb(295, 150, 0)" }}>Restaurant</span>
              </h1>
            </div>
            <div>
              <p className="fs-4 pt-3">
                This dish is full of flavor and nutrition! Quinoa is a complete
                protein, providing all the essential amino acids your body
                needs, and is also a good source of fiber.
              </p>
              <button className="button mt-4" onClick={() => navigate("/menu")}>
                Order Now
              </button>
            </div>
          </div>
        </section>
      </div>

      <div className="container">
        <section className="row">
          <div className="col-12 col-md-6">
            <div
              style={{
                marginTop: "150px",
                lineHeight: "40px",
              }}
            >
              <p className="fs-3 pt-3 text-center">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
                voluptas sit aspernatur aut odit aut fugit.
              </p>
            </div>
          </div>
          <div className="col-12 col-md-6 d-flex justify-content-center">
            <div
              style={{
                marginTop: "150px",
              }}
            >
              <img
                src={about2}
                width={300}
                height={300}
                style={{
                  border: "2px solid red",
                  borderRadius: "50%",
                  boxShadow: "0px 0px 0px 50px  rgba(117, 112, 112, 0.1)",
                }}
                alt=""
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AboutOurRestaurant;
