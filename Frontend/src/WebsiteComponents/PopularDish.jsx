import React from "react";
import Popular from "../Images/Popular.png";
import chinese from "../Images/chinese3.webp";
import { useNavigate } from "react-router-dom";

const PopularDish = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="container mt-5">
        <section className="row align-items-center text-center text-md-start">
          {/* Image Section */}
          <div
            className="col-12 col-md-6 d-flex justify-content-center"
            data-aos="fade-right"
          >
            <img
              src={chinese}
              className="img-fluid rounded-circle"
              alt="Popular Dish"
              style={{
                maxWidth: "100%",
                height: "auto",
              }}
            />
          </div>

          {/* Text Section */}
          <div className="col-12 col-md-6 px-md-4" data-aos="fade-left">
            <h1
              className="jacques-francois-shadow-regular"
              style={{ fontSize: "70px" }}
            >
              Our Most Popular Dish
            </h1>
            <p className="fs-5 pt-3">
              Takeout-Style Kung Pao Chicken is a beloved Chinese-American dish
              known for its bold, spicy, and slightly sweet flavors. It features
              tender, diced chicken stir-fried with crunchy peanuts, bell
              peppers, and dried chili peppers in a rich, savory-sweet sauce
              made with soy sauce, hoisin, and Sichuan peppercorns. This dish is
              famous for its perfect balance of heat, nuttiness, and umami,
              making it a favorite in both restaurants and home kitchens
              worldwide.
            </p>
            <button
              className="button dancing-script"
              style={{ fontSize: "25px", marginTop: "20px" }}
              onClick={() => navigate("/menu")}
            >
              Order Now
            </button>
          </div>
        </section>
      </div>
    </>
  );
};

export default PopularDish;
