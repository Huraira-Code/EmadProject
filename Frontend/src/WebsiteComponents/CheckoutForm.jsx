import { Card, CardContent, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { BASE_URL } from "../Base_URL/BASE_URL";
import { useNavigate } from "react-router-dom";
const CheckoutForm = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const { addToCart } = useSelector((state) => state.addToCartReducer);
  // console.log(addToCart, "stripe");
  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [summary, setSummary] = useState(false);

  const notifyError = (value) =>
    toast.error(value, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  const notifySuccess = (success) =>
    toast.success(success, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  const OrderPlaced = async (e) => {
    e.preventDefault();
    // console.log("Order Placed");

    if (
      !(
        address &&
        firstName &&
        lastName &&
        email &&
        phoneNumber &&
        message &&
        selectedValue
      )
    ) {
      notifyError("🦄 Fill all the fields..");
      return;
    } else {
      const data = {
        address,
        email,
        firstName,
        lastName,
        phoneNumber,
        message,
        paymentMethod: selectedValue,
        orderItems: addToCart.map((orderItem) => ({
          id: orderItem.meal_id,
          quantity: orderItem.count,
          title: orderItem.mealName,
          price: orderItem.Price,

          // abhi jo api lgi hwe hy usmy price nhi hy
          // price: orderItem.price,
        })),
      };

      // console.log("data", data);
    }
    try {
      const res = await axios.post(`${BASE_URL}/checkout`, {
        address: address,
        email: email,
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        message: message,
        paymentMethod: selectedValue,
        orderItems: addToCart.map((orderItem) => ({
          quantity: orderItem.count,
          title: orderItem.mealName,
          price: orderItem.Price,
        })),
      });
      // console.log("res", res);
      notifySuccess("🦄 Your Order Placed Successfully");
      if (res) {
        navigate("/orderSuccess");
      }
    } catch (error) {
      // console.log("error", error);
      notifyError("🦄 Failed to place order");
    }
  };

  // Handler function to update state when radio button is selected
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    // console.log("Selected Payment Method:", event.target.value);
  };

  // Payment Integration Function
  const paymentIntegration = async (e) => {
    e.preventDefault(); // Prevent form from refreshing the page

    if (
      !(
        address &&
        firstName &&
        lastName &&
        email &&
        phoneNumber &&
        message &&
        selectedValue
      )
    ) {
      notifyError("🦄 Fill all the fields..");
      return; // Stop execution if fields are missing
    }

    if (selectedValue === "Payment Online") {
      try {
        const stripe = await loadStripe(
          "pk_test_51Q47vSG124FIRgpMRahy5iBkXZVM4T83UaDc7XZa5trJLGcovncqOPQaL9H9Q6K4BzUW4I1iMfOWxZCWo5DdDIOn00P3pSVRnj"
        );

        const body = {
          products: addToCart,
        };

        const headers = {
          "Content-Type": "application/json",
        };
        //check the connection MERAJ
        const response = await fetch(`${BASE_URL}/online-payment`, {
          method: "POST",
          headers: headers,
          body: JSON.stringify(body),
        });

        if (!response.ok) {
          notifyError("🦄 Failed to create checkout session");
        }

        const session = await response.json();

        const result = await stripe.redirectToCheckout({
          sessionId: session.id,
        });

        if (result.error) {
          notifyError(result.error.message);
        }
      } catch (error) {
        // console.error("Error during payment integration:", error);
        notifyError(error.message);
      }
    } else if (selectedValue === "Cash On Delivery") {
      setSummary(true);
    }
  };
  let subTotal = 0;
  if (addToCart.length > 0) {
    addToCart.forEach((data) => {
      subTotal += data.Price * data.count;
    });
  }
  return (
    <>
      <Modal size="md" isOpen={summary} toggle={() => setSummary(!summary)}>
        <ModalHeader toggle={() => setSummary(!summary)}>
          <h1 className="jacques-francois-shadow-regular">
            Hello!{" "}
            <span style={{ color: "rgb(295, 150, 0)" }}>
              {firstName} {lastName}
            </span>
          </h1>
        </ModalHeader>
        <ModalBody>
          <h2 className="jacques-francois-shadow-regular text-center">
            Thankyou For Your Order
          </h2>
          <hr />
          <h3
            className="jacques-francois-shadow-regular"
            style={{ color: "rgb(295, 150, 0)" }}
          >
            Payment Summary
          </h3>

          {addToCart.length !== 0 ? (
            addToCart.map((data, index) => {
              // console.log(data, "data");

              return (
                <>
                  <div key={index}>
                    <div className="mt-2 d-flex justify-content-between playfair-display">
                      <h5 className="ms-4">
                        {data.mealName} (Qty : {data.count})
                      </h5>
                      <h5 className="me-4">{data.Price * data.count}.00$</h5>
                    </div>
                  </div>
                </>
              );
            })
          ) : (
            <h1
              className="d-flex justify-content-center align-items-center jacques-francois-shadow-regular "
              style={{ color: "grey", margin: "80px 0px 80px 0px" }}
            >
              No Data Found
            </h1>
          )}
          <hr />
          <div className="d-flex justify-content-between playfair-display">
            <h5 className="ms-4">Shipping</h5>
            <h5 className="me-4">0.00$</h5>
          </div>
          <div className="d-flex justify-content-between playfair-display">
            <h5 className="ms-4">Tax</h5>
            <h5 className="me-4">0.00$</h5>
          </div>
          <div className="mt-3 d-flex justify-content-between jacques-francois-shadow-regular">
            <h4 className="ms-4 fw-bold">Total</h4>
            <h4 className="me-4 fw-bold">
              {/* {data?.Price ? data?.Price : "None"} */}
              {subTotal}.00$
            </h4>
          </div>

          {addToCart.length !== 0 && (
            <div className="d-flex justify-content-center align-items-center mt-3">
              <button
                className="button"
                onClick={OrderPlaced}
                // onClick={() => navigate("/checkout")}
              >
                Place Order
              </button>
            </div>
          )}
        </ModalBody>
      </Modal>

      {/* checkout form */}
      {addToCart.length !== 0 ? (
        <Card
          style={{
            maxWidth: 900,
            margin: "0 auto",
            marginTop: "50px",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <CardContent>
            <form onSubmit={paymentIntegration}>
              <div className="text-center">
                <h1
                  className="jacques-francois-shadow-regular"
                  style={{ fontSize: "60px", wordSpacing: "25px" }}
                >
                  Checkout
                </h1>
              </div>
              <hr />
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <h5 className="jacques-francois-shadow-regular">
                    Shipping Address
                  </h5>
                  <TextField
                    required
                    onChange={(e) => setAddress(e.target.value)}
                    label="Shipping Address"
                    placeholder="Address"
                    variant="outlined"
                    fullWidth
                    value={address}
                  />
                </Grid>
              </Grid>

              <div className="pt-3">
                <h5 className="jacques-francois-shadow-regular">Order Data</h5>
              </div>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    onChange={(e) => setFirstName(e.target.value)}
                    label="First Name"
                    placeholder="First name"
                    variant="outlined"
                    fullWidth
                    value={firstName}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    onChange={(e) => setLastName(e.target.value)}
                    label="Last Name"
                    placeholder="Last name"
                    variant="outlined"
                    fullWidth
                    value={lastName}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    label="Email Address"
                    placeholder="Email address"
                    variant="outlined"
                    fullWidth
                    value={email}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    label="Phone Number"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Phone number"
                    variant="outlined"
                    fullWidth
                    type="number"
                    value={phoneNumber}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    onChange={(e) => setMessage(e.target.value)}
                    label="Message"
                    placeholder="Write your message here..."
                    multiline
                    rows={4}
                    variant="outlined"
                    fullWidth
                    value={message}
                  />
                </Grid>
              </Grid>

              <div className="pt-3">
                <h5 className="jacques-francois-shadow-regular">
                  Payment Method
                </h5>
                <FormControl className="d-flex justify-content-between">
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={selectedValue}
                    onChange={handleChange}
                    className="w-100 pt-2"
                  >
                    <FormControlLabel
                      value="Cash On Delivery"
                      control={<Radio />}
                      label={
                        <span style={{ fontSize: "20px" }}>
                          Cash On Delivery
                        </span>
                      }
                      className="me-5"
                    />
                    <FormControlLabel
                      value="Payment Online"
                      control={<Radio />}
                      label={
                        <span style={{ fontSize: "20px" }}>Payment Online</span>
                      }
                      className="me-5"
                    />
                  </RadioGroup>
                </FormControl>
              </div>

              <div className="mt-4">
                <button
                  className="button w-100 d-flex justify-content-center py-2 fs-4"
                  type="submit"
                  // onClick={() => setSummary(true)}
                >
                  Confirm Order
                </button>
              </div>
            </form>

            <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </CardContent>
        </Card>
      ) : (
        <h1
          className="d-flex justify-content-center align-items-center jacques-francois-shadow-regular "
          style={{
            color: "grey",
            margin: "80px 0px 80px 0px",
            fontSize: "50px",
          }}
        >
          Please add Some Food to your Cart
        </h1>
      )}
    </>
  );
};

export default CheckoutForm;
