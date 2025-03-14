import { Card, CardContent } from "@mui/material";
import React, { useEffect } from "react";
import Popular from "../Images/Popular.png";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../Store/ProductSlice";
import { addCart } from "../Store/AddToCart";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CardComponent = ({ selectedCategory }) => {
  const dispatch = useDispatch();
  const { allProduct } = useSelector((state) => state.productReducer);
  // console.log("allProduct", allProduct);

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

  const filterProducts = allProduct?.filter((e) => {
    try {
      if (!selectedCategory || selectedCategory === "All") {
        return true;
      } else {
        return e.meal_category.includes(selectedCategory);
      }
    } catch (error) {
      console.log(error);
      return false; // Handle the error by returning false or handle it accordingly
    }
  });

  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  return (
    <div className="container">
      <div className="row">
        {/* {Array.isArray(allProduct) && */}
        {filterProducts.map((data, index) => {
          return (
            <div key={index} className="col-12 col-sm-6 col-md-4">
              <div
                style={{
                  border: "2px solid #fff",
                  borderRadius: "50px",
                  marginTop: "50px",
                  backgroundColor: "#fff",
                  boxShadow: "5px 5px 0px 0px rgb(295, 150, 0)",
                }}
              >
                <div className="text-center pt-2">
                  <img
                    style={{ borderRadius: "100px" }}
                    src={data.image}
                    height={210}
                    width={210}
                    alt={data.title || "No Title"}
                  />
                  <h2 className="jacques-francois-shadow-regular pt-4">
                    {data.mealName
                      ? data.mealName.substring(0, 14) + "..."
                      : "No Title"}
                  </h2>
                  <p
                    className="pt-3"
                    style={{ fontSize: "17px", fontWeight: "lighter" }}
                  >
                    {data.Description}
                  </p>
                  <div className="d-flex justify-content-around pb-5 pt-4 ">
                    <h3 className="pt-2 fw-bold">${data.Price}.00</h3>
                    <button
                      className="button"
                      onClick={() => {
                        try {
                          dispatch(addCart(data)); // Add item to the cart
                          notifySuccess("Item added successfully"); // Show success notification
                        } catch (error) {
                          notifyError("Something went wrong"); // Show error notification if an error occurs
                        }
                      }}
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
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
        })}
      </div>
    </div>
  );
};

export default CardComponent;
