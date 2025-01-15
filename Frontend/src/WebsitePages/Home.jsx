import React from "react";
import Navbar from "../WebsiteComponents/Navbar";
import Welcome from "../WebsiteComponents/Welcome";
import PopularDish from "../WebsiteComponents/PopularDish";
import PopularMenu from "../WebsiteComponents/PopularMenu";
import CardComponent from "../WebsiteComponents/CardComponent";
import PopularChef from "../WebsiteComponents/PopularChef";
import Hungry from "../WebsiteComponents/Hungry";
import Footer from "../WebsiteComponents/Footer";

const Home = () => {
  return (
    <>
      <Navbar />
      <Welcome />
      <PopularDish />
      <PopularMenu />
      <CardComponent />
      <PopularChef />
      <Hungry />
      <Footer />
    </>
  );
};

export default Home;
