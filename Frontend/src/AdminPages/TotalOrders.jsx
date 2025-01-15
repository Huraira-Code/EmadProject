import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Grid,
  TextField,
  InputAdornment,
} from "@mui/material";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { BASE_URL } from "../Base_URL/BASE_URL";
import { toast, ToastContainer } from "react-toastify";
import DeleteIcon from "@mui/icons-material/Delete";

const TotalOrders = () => {
  const [meal, setMeal] = useState([]);
  const [mealModal, setMealModal] = useState(false);
  //State for Delete Order Id
  const [productId, setProductId] = useState("");
  //Sate for rejected Order
  const [rejected, setRejected] = useState(false);
  //State for Accepted Order
  const [accepted, setAccepted] = useState(false);
  //State For Refresh the page
  const [refresh, setRefresh] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  //Notification for success
  const notifySuccess = (success) =>
    toast.success(success, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  //Notification for error
  const notifyError = (error) =>
    toast.error(error, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  //Get Orders from the database
  const getOrders = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/getcheckout`);
      // console.log("get_Order", res.data.data);
      setMeal(res.data.data);
    } catch (error) {
      notifyError(error.message);
      // console.log("error", error);
    }
  };
  //Setting Delete Order Id
  const setIdForDeleteOrder = async (id) => {
    // console.log("id", id);
    setProductId(id);
    setMealModal(true);
  };
  //Delete Order from the database
  const deletedOrder = async () => {
    try {
      const res = await axios.delete(`${BASE_URL}/delcheckout/${productId}`);
      notifySuccess("Order Deleted Successfully!!");
      setMealModal(false);
      setRefresh(!refresh);
    } catch (error) {
      notifyError("Order Not Deleted!!");
      // console.log("error", error);
    }
  };
  // Accepted Order Function
  const acceptedOrder = async (id) => {
    try {
      const res = await axios.post(`${BASE_URL}/acceptedOrder/${id}`);
      // console.log("AccOrder", res.data);
      notifySuccess("Order Accepted Successfully!!");
      setRefresh(!refresh);
    } catch (error) {
      notifyError("Order Not Accepted!!");
      // console.log("error", error);
    }

    try {
      const res = await axios.post(`${BASE_URL}/orderTransfer/${id}`, {
        OrderData: id,
        status: "Accepted",
      });
      // console.log("AccOrderEmail", res.data);
      notifySuccess("Email sent Successfully!!");
    } catch (error) {
      notifyError("Order Not Accepted!!");
      // console.log("error", error);
    }
  };

  //setId for rejected Order
  const setIdForRejectedOrder = (id) => {
    setProductId(id);
    setRejected(true);
  };
  // Rejected Order Function
  const rejectedOrder = async (id) => {
    try {
      const res = await axios.post(`${BASE_URL}/rejectedOrder/${id}`);
      // console.log("RejOrder", res.data);
      notifySuccess("Order Recjected Successfully!!");
    } catch (error) {
      notifyError("Order Not Rejected!!");
      // console.log("error", error);
    }

    try {
      const res = await axios.post(`${BASE_URL}/orderTransfer/${id}`, {
        OrderData: id,
        status: "Rejected",
      });
      // console.log("RejOrderEmail", res.data);
      notifySuccess("Email sent Successfully!!");
    } catch (error) {
      notifyError("Order Not Accepted!!");
      // console.log("error", error);
    }
  };

  //UseEffect to get Orders
  useEffect(() => {
    getOrders();
  }, [refresh]);

  const filteredMeals = meal.filter((order) =>
    `${order.firstName} ${order.lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* Are you sure modal */}
      <Modal
        size="md"
        isOpen={mealModal}
        toggle={() => setMealModal(!mealModal)}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center", // Vertically centers the modal
          height: "100vh", // Full viewport height to center vertically
        }}
        contentClassName="custom-modal-content" // For further customization
      >
        <ModalHeader toggle={() => setMealModal(!mealModal)}>
          <h1 className="jacques-francois-shadow-regular text-danger">
            WARNING
          </h1>
          <p>Are You Sure you want to delete?</p>
          <button
            onClick={() => setMealModal(false)}
            className="btn btn-secondary me-3"
          >
            No
          </button>
          <button onClick={() => deletedOrder()} className="btn btn-danger">
            Yes
          </button>
        </ModalHeader>
        <ModalBody></ModalBody>
      </Modal>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "10px",
          boxSizing: "border-box",
        }}
      >
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
        <Card
          style={{
            width: "100%",
            maxWidth: "1000px", // Sets a max-width for larger screens
            margin: "0 auto",
            padding: "10px",
            border: "1px solid black",
            backgroundColor: "white",
            borderRadius: "10px",
          }}
        >
          <CardContent>
            <h1
              className="d-flex justify-content-start fw-bold jacques-francois-shadow-regular"
              style={{ fontSize: "42px", color: "rgb(295, 150, 0)" }}
            >
              Orders
            </h1>
            <hr
              style={{
                height: "3px",
                color: "black",
                backgroundColor: "black",
              }}
            />

            {/* buttons */}
            <div className="d-flex justify-content-between jacques-francois-shadow-regular">
              {/* <button className="UButton" onClick={() => setMeal(true)}>
                Add Item
              </button> */}

              <h1
                className="fw-bold pt-2 jacques-francois-shadow-regular"
                style={{ fontSize: "30px" }}
              >
                Total Orders :{meal.length}
              </h1>

              <Grid item xs={5}>
                <TextField
                  label="Search"
                  placeholder="Accessories Id"
                  variant="outlined"
                  fullWidth
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                  InputLabelProps={{
                    style: { color: "rgb(295, 150, 0)" }, // Change label color to black
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "rgb(295, 150, 0)", // Change border color to black
                      },
                      "&:hover fieldset": {
                        borderColor: "rgb(295, 150, 0)",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "rgb(295, 150, 0)",
                      },
                    },
                    input: { color: "black" }, // Change input text color to black
                  }}
                />
              </Grid>
            </div>
            <hr
              style={{
                height: "3px",
                borderWidth: "0",
                color: "black",
                backgroundColor: "black",
              }}
            />

            {/* Table */}
            {/* Table */}
            <div
              style={{
                marginTop: "10px",
                maxHeight: "220px",
                overflowY: "auto",
              }}
            >
              <table className="table table-striped ">
                <thead>
                  <tr className="jacques-francois-shadow-regular fs-5">
                    <th scope="col">#</th>
                    <th scope="col">Order No.</th>
                    <th scope="col">Name</th>
                    <th scope="col">Phone No.</th>
                    <th scope="col">Order Date</th>
                    <th scope="col">Order Time</th>
                    <th scope="col" className="text-center">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMeals.map((e, i) => {
                    const createdAtDate = e.createdAt.split("T")[0];
                    const updatedAtDate = e.updatedAt.split("T")[0];
                    return (
                      <tr key={i}>
                        <th scope="row" className="pt-3">
                          {i + 1}
                        </th>
                        <td className="pt-3 text-center">{i + 1}</td>
                        <td className="pt-3">
                          {e.firstName + " " + e.lastName}
                        </td>
                        <td className="pt-3">{e.phoneNumber}</td>
                        <td className="pt-3">{createdAtDate}</td>
                        <td className="pt-3">
                          {new Date(e.createdAt).toTimeString().split(" ")[0]}
                        </td>
                        <td className="pt-2">
                          <button
                            onClick={() => acceptedOrder(e._id)}
                            className="btn btn-success"
                          >
                            Accepted
                          </button>
                          <button
                            onClick={() => rejectedOrder(e._id)}
                            className="btn btn-danger ms-1"
                          >
                            Rejected
                          </button>
                        </td>
                        {/* <td className="pt-2">
                          {" "}
                          <button
                            onClick={() => setIdForDeleteOrder(e._id)}
                            style={{
                              display: "inline-flex",
                              justifyContent: "center",
                              alignItems: "center",
                              border: "1px solid red",
                              borderRadius: "50%",
                              height: "40px", // Same fixed height
                              width: "40px", // Same fixed width
                              backgroundColor: "transparent", // No background
                              cursor: "pointer", // Pointer cursor for a button
                              marginLeft: "10px", // Add some spacing between the buttons
                            }}
                          >
                            <DeleteIcon className="text-danger" />
                          </button>
                        </td> */}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default TotalOrders;
