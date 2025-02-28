// import React from "react";

// const PopularMenu = () => {
//   return (
//     <>
//       <div className="container" style={{ marginTop: "150px" }}>
//         <section className="row">
//           <div className="col-12">
//             {/* Title Section */}
//             <div className="text-center">
//               <h1
//                 className="jacques-francois-shadow-regular"
//                 style={{ fontSize: "60px", wordSpacing: "25px" }}
//               >
//                 Our Popular Menu
//               </h1>
//             </div>

//             {/* Menu Categories */}
//             <div style={{ marginTop: "80px" }}>
//               <ul className="list-unstyled d-flex flex-column flex-md-row justify-content-center align-items-center fs-5 dancing-script">
//                 <li className="list mb-3 mb-md-0 mx-md-3">All Category</li>
//                 <li className="list mb-3 mb-md-0 mx-md-3">Dinner</li>
//                 <li className="list mb-3 mb-md-0 mx-md-3">Lunch</li>
//                 <li className="list mb-3 mb-md-0 mx-md-3">Dessert</li>
//                 <li className="list mb-3 mb-md-0 mx-md-3">Drink</li>
//               </ul>
//             </div>
//           </div>
//         </section>
//       </div>
//     </>
//   );
// };

// export default PopularMenu;
import React from "react";

const PopularMenu = () => {
  return (
    <div className="container mt-5">
      <section className="row">
        <div className="col-12 text-center">
          {/* Title Section */}
          {/* <h1 className="jacques-francois-shadow-regular ">Our Popular Menu</h1> */}
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
              <li className="list px-3">All Category</li>
              <li className="list px-3">Dinner</li>
              <li className="list px-3">Lunch</li>
              <li className="list px-3">Dessert</li>
              <li className="list px-3">Drink</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PopularMenu;
