import React from "react";
import Navbar from "../WebsiteComponents/Navbar";

import DealCard from "../WebsiteComponents/DealCard";

const Deals = () => {
  return (
    <>
      <Navbar />
      {/* Our popular Deals */}
      <div className="container" style={{ marginTop: "50px" }}>
        <section className="row">
          <div className="col-12">
            {/* Title Section */}
            <div className="text-center">
              <h1
                className="jacques-francois-shadow-regular"
                style={{ fontSize: "60px", wordSpacing: "25px" }}
              >
                Our Popular{" "}
                <span style={{ color: "rgb(295, 150, 0)" }}>Deals</span>
              </h1>
            </div>

            {/* Menu Categories */}
            {/* <div style={{ marginTop: "80px" }}>
              <ul className="list-unstyled d-flex flex-column flex-md-row justify-content-center align-items-center fs-5 dancing-script">
                <li className="list mb-3 mb-md-0 mx-md-3">All Category</li>
                <li className="list mb-3 mb-md-0 mx-md-3">Dinner</li>
                <li className="list mb-3 mb-md-0 mx-md-3">Lunch</li>
                <li className="list mb-3 mb-md-0 mx-md-3">Dessert</li>
                <li className="list mb-3 mb-md-0 mx-md-3">Drink</li>
              </ul>
            </div> */}
          </div>
        </section>
      </div>
      <DealCard />
    </>
  );
};

export default Deals;
