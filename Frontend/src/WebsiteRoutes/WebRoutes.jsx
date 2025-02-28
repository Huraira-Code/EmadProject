import React from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import Home from "../WebsitePages/Home";
import Menu from "../WebsitePages/Menu";
import Aboout from "../WebsitePages/Aboout";
import Reservation from "../WebsitePages/Reservation";
import Contact from "../WebsitePages/Contact";
import Checkout from "../WebsitePages/Checkout";
import AdminForm from "../AdminPages/AdminForm";
import AdminDashboard from "../AdminPages/AdminDashboard";
import SuccessCheckout from "../WebsiteComponents/SuccessCheckout";
import ErrorCheckout from "../WebsiteComponents/ErrorCheckout";
import WelcomePage from "../AdminPages/WelcomePage";
import OrderSuccess from "../WebsitePages/OrderSuccess";
import Deals from "../WebsitePages/Deals";
import Deals_Meals from "../WebsitePages/Deals_Meals";

const WebRoutes = () => {
  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/deals" element={<Deals />} />
        <Route path="/about" element={<Aboout />} />
        <Route path="/dealMeal" element={<Deals_Meals />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<AdminForm />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orderSuccess" element={<OrderSuccess />} />
        <Route path="/success" element={<SuccessCheckout />} />
        <Route path="/error" element={<ErrorCheckout />} />
        <Route element={<AuthProtection />}>
          <Route path="/adminPortal/welcome" element={<WelcomePage />} />
          <Route path="/adminPortal/*" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </>
  );
};

// Auth Protection
const AuthProtection = () => {
  return (
    <>{localStorage.getItem("uid") ? <Outlet /> : <Navigate to={"/admin"} />}</>
  );
};
export default WebRoutes;
