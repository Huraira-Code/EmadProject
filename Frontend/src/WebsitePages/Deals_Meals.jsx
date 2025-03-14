import React, { useEffect, useState } from "react";
import { fetchProduct } from "../Store/ProductSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../Base_URL/BASE_URL";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import {
  addCartToReservatioin,
  removeReservationCart,
  ReservationCartDecrement,
  ReservationCartIncrement,
} from "../Store/ReservationCart";
import { useNavigate } from "react-router-dom";
import ReservationData from "../WebsiteComponents/ReservationData";

const Deals_Meals = ({
  secondModal,
  setSecondModal,
  date,
  time,
  size,
  day,
}) => {
  // console.log(date, time, size, day, secondModal, "new data");
  // const navigate = useNavigate();
  const notifySuccess = (success) =>
    toast.success(success, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const notifyError = (error) =>
    toast.error(error, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  const dispatch = useDispatch();
  const { ReservationCart } = useSelector(
    (state) => state.ReservationCartReducer
  );
  const { allProduct } = useSelector((state) => state.productReducer);

  const [data, setData] = useState([]);
  const [render, setRender] = useState(false);
  const [cartModal, setCartModal] = useState(false);
  const [transfer, setTransfer] = useState(false);
  useEffect(() => {
    dispatch(fetchProduct());
    getDeal();
  }, [dispatch]);

  const getDeal = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/getDeal`);
      // console.log("get deal", res.data.data);
      setData(res.data.data);
    } catch (error) {
      console.error("Error fetching deals:", error);
    }
  };
  const stock = 12;
  return (
    <>
      {/* Cart Modal */}
      <Modal
        size="md"
        isOpen={cartModal}
        toggle={() => setCartModal(!cartModal)}
      >
        <ModalHeader toggle={() => setCartModal(!cartModal)}>
          <h1
            className="jacques-francois-shadow-regular"
            style={{ color: "rgb(295, 150, 0)" }}
          >
            Reservation Order Detail
          </h1>
        </ModalHeader>
        <ModalBody>
          {ReservationCart.length !== 0 ? (
            ReservationCart.map((e, i) => (
              <div className="container" key={i}>
                <section className="row">
                  <div className="col-12 col-md-6 mt-3 text-center">
                    <img
                      src={e.image}
                      width={200}
                      height={180}
                      alt={e.mealName || `Deal No # ${e.dealNumber}`}
                      style={{ borderRadius: "40px" }}
                    />
                  </div>
                  <div className="col-12 col-md-6 mt-3 text-center">
                    <h4 className="jacques-francois-shadow-regular">
                      {e.mealName ? e.mealName : `Deal No # ${e.dealNumber}`}
                    </h4>
                    <h5 className="pt-1 fw-bold">
                      {e.count} <span className="fs-5 fw-light">X</span>{" "}
                      {e.Price || e.dealPrice}$ ={" "}
                      {e.count * (e.Price || e.dealPrice)}$
                    </h5>
                    <div>
                      <button
                        className="button"
                        onClick={() => {
                          e.count > 1
                            ? dispatch(ReservationCartDecrement(e._id))
                            : dispatch(removeReservationCart(e));
                        }}
                      >
                        -
                      </button>
                      <button
                        className="ms-3 button"
                        onClick={() => {
                          e.count < stock
                            ? dispatch(ReservationCartIncrement(e._id))
                            : console.log("Stock limit reached");
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </section>
              </div>
            ))
          ) : (
            <h1
              className="d-flex justify-content-center align-items-center jacques-francois-shadow-regular"
              style={{ color: "grey", margin: "80px 0px" }}
            >
              Your Cart is Empty
            </h1>
          )}

          {ReservationCart.length !== 0 && (
            <div className="d-flex justify-content-center align-items-center mt-5">
              <button
                className="button"
                onClick={() => {
                  setTransfer(true);
                }}
              >
                Checkout
              </button>
            </div>
          )}
        </ModalBody>
      </Modal>

      {/* .Items Modal */}
      <Modal
        size="xl"
        isOpen={secondModal}
        toggle={() => setSecondModal(!secondModal)}
      >
        <ModalHeader toggle={() => setSecondModal(!secondModal)}>
          <div className="d-flex align-items-center">
            <h1
              className="jacques-francois-shadow-regular"
              style={{ fontSize: "40px", wordSpacing: "20px" }}
            >
              <span style={{ color: "rgb(295, 150, 0)" }}>Order</span> Your
              Favourite <span style={{ color: "rgb(295, 150, 0)" }}>Meal</span>{" "}
              With Reservation
            </h1>

            <button
              className="button ms-5"
              onClick={() => setCartModal(!cartModal)}
            >
              Cart {ReservationCart.length}
            </button>
          </div>
        </ModalHeader>
        <ModalBody>
          <div>
            <ul className="list-unstyled d-flex flex-row justify-content-center align-items-center fs-5 dancing-script flex-wrap">
              <li
                className="list mx-2 text-center"
                onClick={() => setRender(false)}
                style={{ cursor: "pointer" }}
              >
                Meal
              </li>
              <li
                className="list mx-2 text-center"
                onClick={() => setRender(true)}
                style={{ cursor: "pointer" }}
              >
                Deals
              </li>
            </ul>
          </div>

          {!render ? (
            <div className="container">
              <section className="row">
                {Array.isArray(allProduct) &&
                  allProduct.map((product, index) => (
                    <div key={index} className="col-12 col-sm-6 col-md-4">
                      <div
                        style={{
                          border: "2px solid #fff",
                          borderRadius: "50px",
                          marginTop: "20px",
                          backgroundColor: "#fff",
                          boxShadow: "5px 5px 0px 0px rgb(295, 150, 0)",
                        }}
                      >
                        <div className="text-center pt-2">
                          <img
                            style={{ borderRadius: "100px" }}
                            src={product.image}
                            height={200}
                            width={200}
                            alt={product.title || "No Title"}
                          />
                          <h2 className="jacques-francois-shadow-regular pt-4">
                            {product.mealName
                              ? product.mealName.substring(0, 14) + "..."
                              : "No Title"}
                          </h2>
                          <p
                            className="pt-3"
                            style={{ fontSize: "17px", fontWeight: "lighter" }}
                          >
                            {product.Description}
                          </p>
                          <div className="d-flex justify-content-around pb-5 pt-4">
                            <h3 className="pt-2 fw-bold">
                              ${product.Price}.00
                            </h3>
                            <button
                              className="button"
                              onClick={() => {
                                try {
                                  dispatch(addCartToReservatioin(product));
                                  notifySuccess("Item added successfully");
                                } catch (error) {
                                  notifyError("Something went wrong");
                                }
                              }}
                            >
                              Add To Cart
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </section>
            </div>
          ) : (
            <div className="container mt-4">
              <section className="row">
                {data.map((deal, id) => (
                  <div
                    key={id}
                    className="col-12 col-sm-6 col-md-4 text-center text-white jacques-francois-shadow-regular"
                  >
                    <h5
                      style={{
                        fontSize: "30px",
                        color: "rgb(295, 150, 0)",
                        fontWeight: "bolder",
                      }}
                    >
                      Deal No{" "}
                      <span className="text-dark"># {deal.dealNumber}</span>
                    </h5>
                    <div
                      className="border border-1 border-warning-subtle rounded-circle py-5"
                      style={{ backgroundColor: "rgb(295, 150, 0)" }}
                    >
                      <h3 className="fw-bolder text-dark">{deal.dealTitle}</h3>
                      {deal.dealItems.map((e, i) => (
                        <h5 key={i}>{e}</h5>
                      ))}
                      <h5 className="text-dark">
                        Rs :{" "}
                        <span className="fw-bold fs-4">{deal.dealPrice} $</span>
                      </h5>
                      <button
                        className="UButton mt-2"
                        // onClick={() => dispatch(addCartToReservatioin(deal))}
                        onClick={() => {
                          try {
                            dispatch(addCartToReservatioin(deal));
                            notifySuccess("Item added successfully");
                          } catch (error) {
                            notifyError("Something went wrong");
                          }
                        }}
                      >
                        Add To Cart
                      </button>
                    </div>
                  </div>
                ))}
              </section>
            </div>
          )}
        </ModalBody>
      </Modal>

      {transfer && (
        <ReservationData
          modal={secondModal}
          date={date}
          time={time} // Pass formatted AM/PM time
          size={size}
          day={day} // Pass day of the week
          setModal={setSecondModal}
        />
      )}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
};

export default Deals_Meals;
