import React from "react";
import Navbar from "../WebsiteComponents/Navbar";
import AboutOurRestaurant from "../WebsiteComponents/AboutOurRestaurant";
import Footer from "../WebsiteComponents/Footer";
import Owner from "../WebsiteComponents/Owner";

const Aboout = () => {
  return (
    <div>
      <Navbar />
      <AboutOurRestaurant />
      <Owner />
      <Footer />
    </div>
  );
};

export default Aboout;
