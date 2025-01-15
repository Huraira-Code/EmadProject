import React from "react";
// import { Navbar } from "react-bootstrap";
import Cont from "../WebsiteComponents/Cont";
import Footer from "../WebsiteComponents/Footer";
import Navbar from "../WebsiteComponents/Navbar";
import ContactForm from "../WebsiteComponents/ContactForm";

const Contact = () => {
  return (
    <div>
      <Navbar />
      <Cont />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default Contact;
