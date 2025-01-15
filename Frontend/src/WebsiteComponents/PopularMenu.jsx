import React from "react";

const PopularMenu = () => {
  return (
    <>
      <div className="container" style={{ marginTop: "150px" }}>
        <section className="row">
          <div className="col-12">
            {/* Title Section */}
            <div className="text-center">
              <h1
                className="jacques-francois-shadow-regular"
                style={{ fontSize: "60px", wordSpacing: "25px" }}
              >
                Our Popular Menu
              </h1>
            </div>

            {/* Menu Categories */}
            <div style={{ marginTop: "80px" }}>
              <ul className="list-unstyled d-flex flex-column flex-md-row justify-content-center align-items-center fs-5 dancing-script">
                <li className="list mb-3 mb-md-0 mx-md-3">All Category</li>
                <li className="list mb-3 mb-md-0 mx-md-3">Dinner</li>
                <li className="list mb-3 mb-md-0 mx-md-3">Lunch</li>
                <li className="list mb-3 mb-md-0 mx-md-3">Dessert</li>
                <li className="list mb-3 mb-md-0 mx-md-3">Drink</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default PopularMenu;
