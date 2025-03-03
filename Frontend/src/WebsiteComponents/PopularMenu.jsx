import React, { useState } from "react";
import CardComponent from "./CardComponent";

const PopularMenu = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  console.log(selectedCategory, "--->category");

  return (
    <div className="container mt-5">
      <section className="row">
        <div className="col-12 text-center">
          {/* Title Section */}
          <h1
            className="jacques-francois-shadow-regular"
            style={{ fontSize: "60px", wordSpacing: "25px" }}
          >
            Our Popular Menu
          </h1>

          {/* Menu Categories */}
          <div className="mt-4">
            <ul
              className="list-unstyled d-flex justify-content-center align-items-center fs-5 dancing-script"
              style={{
                overflowX: "auto", // Enables horizontal scrolling if needed
                whiteSpace: "nowrap", // Prevents wrapping
                gap: "20px", // Adds spacing
                padding: "10px 0",
                listStyle: "none",
              }}
            >
              <li
                className="list px-3"
                onClick={() => setSelectedCategory("All")}
              >
                All Category
              </li>
              <li
                className="list px-3"
                onClick={() => setSelectedCategory("Dinner")}
              >
                Dinner
              </li>
              <li
                className="list px-3"
                onClick={() => setSelectedCategory("Lunch")}
              >
                Lunch
              </li>
              <li
                className="list px-3"
                onClick={() => setSelectedCategory("Desert")}
              >
                Dessert
              </li>
              <li
                className="list px-3"
                onClick={() => setSelectedCategory("Drink")}
              >
                Drink
              </li>
            </ul>
          </div>
        </div>
      </section>
      <CardComponent selectedCategory={selectedCategory} />
    </div>
  );
};

export default PopularMenu;
