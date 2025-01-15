import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LoginIcon from "@mui/icons-material/Login";
import { useDispatch, useSelector } from "react-redux";
import { Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import {
  cartDecrement,
  cartIncrement,
  removeAddToCart,
} from "../Store/AddToCart";
import logo2 from "../Images/logo.png";
const Navbar = () => {
  const { addToCart } = useSelector((state) => state.addToCartReducer);
  // console.log(addToCart, "Navbar");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cart, setCart] = useState(false);
  const stock = 12;
  return (
    <>
      <Modal size="md" isOpen={cart} toggle={() => setModal(!cart)}>
        <ModalHeader toggle={() => setCart(!cart)}>
          <h1
            className="jacques-francois-shadow-regular"
            style={{ color: "rgb(295, 150, 0)" }}
          >
            Order Detail
          </h1>
        </ModalHeader>
        <ModalBody>
          {addToCart.length !== 0 ? (
            addToCart.map((data, index) => {
              // console.log(addToCart, "data");
              // console.log(data, "data");

              return (
                <>
                  <div className="container" key={index}>
                    <section className="row">
                      <div className="col-12 col-md-6 mt-3">
                        <div>
                          <img
                            src={data.image}
                            width={200}
                            height={180}
                            alt={data.mealName}
                            style={{
                              borderRadius: "40px",
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-12 col-md-6 mt-3">
                        <div>
                          <h4 className="jacques-francois-shadow-regular text-center">
                            {data.mealName}
                          </h4>
                          <div>
                            <h5 className="pt-1 text-center fw-bold">
                              {data.count}
                              <span className="fs-5 fw-light"> X</span>{" "}
                              {data.Price}$ = {data.Price * data.count}$
                            </h5>
                          </div>
                          <div className="text-center">
                            <button
                              className=" button"
                              onClick={() => {
                                data.count > 1
                                  ? dispatch(cartDecrement(data._id))
                                  : dispatch(removeAddToCart(data));
                              }}
                            >
                              -
                            </button>
                            <button
                              className="ms-3 button"
                              onClick={() => {
                                data.count < stock
                                  ? dispatch(cartIncrement(data._id))
                                  : setCount(stock);
                              }}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>
                </>
              );
            })
          ) : (
            <h1
              className="d-flex justify-content-center align-items-center jacques-francois-shadow-regular "
              style={{ color: "grey", margin: "80px 0px 80px 0px" }}
            >
              Your Cart is Empty
            </h1>
          )}

          {addToCart.length !== 0 && (
            <div className="d-flex justify-content-center align-items-center mt-5">
              <button className="button" onClick={() => navigate("/checkout")}>
                Checkout
              </button>
            </div>
          )}
        </ModalBody>
      </Modal>

      {/* Navbar */}
      <nav className="navbar navbar-expand-lg bg-transparent">
        <div className="container-fluid">
          <NavLink
            className="navbar-brand ms-2"
            style={{ width: "70px", height: "100px" }}
            to="/"
          >
            <img src={logo2} alt="fresco" width="200px" height="100px" />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul
              className="navbar-nav mx-auto mb-2 mb-lg-0 jacques-francois-shadow-regular"
              style={{ fontSize: "20px" }}
            >
              <li className="nav-item me-3">
                <NavLink
                  className="nav-link active"
                  aria-current="page"
                  to="/"
                  style={({ isActive }) => ({
                    color: isActive ? "rgb(295, 150, 0)" : "black",
                  })}
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item me-3">
                <NavLink
                  className="nav-link"
                  to="/menu"
                  style={({ isActive }) => ({
                    color: isActive ? "rgb(295, 150, 0)" : "black",
                  })}
                >
                  Menu
                </NavLink>
              </li>

              <li className="nav-item me-3">
                <NavLink
                  className="nav-link"
                  to="/reservation"
                  aria-disabled="true"
                  style={({ isActive }) => ({
                    color: isActive ? "rgb(295, 150, 0)" : "black",
                  })}
                >
                  Reservation
                </NavLink>
              </li>
              <li className="nav-item me-3">
                <NavLink
                  className="nav-link"
                  to="/about"
                  aria-disabled="true"
                  style={({ isActive }) => ({
                    color: isActive ? "rgb(295, 150, 0)" : "black",
                  })}
                >
                  About Us
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/contact"
                  aria-disabled="true"
                  style={({ isActive }) => ({
                    color: isActive ? "rgb(295, 150, 0)" : "black",
                  })}
                >
                  Contact
                </NavLink>
              </li>
            </ul>

            <div className="row">
              <div className="d-flex me-5">
                <button className="button" onClick={() => setCart(true)}>
                  <ShoppingCartIcon />
                  Cart ({addToCart.length})
                </button>
                {/* <button className="button ms-2">
                  <LoginIcon />
                  login
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

{
  /* <button className="button mt-3">Checkout</button> */
}
