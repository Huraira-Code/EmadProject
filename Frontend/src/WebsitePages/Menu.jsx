import React from "react";
import Navbar from "../WebsiteComponents/Navbar";
import PopularMenu from "../WebsiteComponents/PopularMenu";
import CardComponent from "../WebsiteComponents/CardComponent";
import Footer from "../WebsiteComponents/Footer";

const Menu = () => {
  return (
    <div>
      <Navbar />
      <PopularMenu />
      <CardComponent />
      <Footer />
    </div>
  );
};

export default Menu;
