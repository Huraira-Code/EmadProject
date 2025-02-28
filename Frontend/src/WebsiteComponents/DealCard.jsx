import React, { useEffect, useState } from "react";
import { BASE_URL } from "../Base_URL/BASE_URL";
import axios from "axios";
import { addCart } from "../Store/AddToCart";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

const DealCard = () => {
  const [data, setData] = useState([]);
  const getDeal = async () => {
    const res = await axios.get(`${BASE_URL}/getDeal`);
    console.log("get deal", res.data.data);
    setData(res.data.data);
  };
  useEffect(() => {
    getDeal();
  }, []);
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
  return (
    <div className="container mt-5">
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
              Deal No <span className="text-dark"># {deal.dealNumber}</span>
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
                Rs : <span className="fw-bold fs-4">{deal.dealPrice}</span>
              </h5>
              <button
                // className="btn btn-outline-light bg-dark fs-5 mt-2"
                className="UButton mt-2"
                onClick={() => {
                  try {
                    dispatch(addCart(deal)); // Add item to the cart
                    notifySuccess("Deal added successfully"); // Show success notification
                  } catch (error) {
                    notifyError("Something went wrong"); // Show error notification if an error occurs
                  }
                }}
              >
                Add To Cart
              </button>
            </div>
          </div>
        ))}
      </section>
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
    </div>
  );
};

export default DealCard;
