import {
  Card,
  CardContent,
  Grid,
  TextField,
  InputAdornment,
  FormControlLabel,
  CircularProgress,
  Autocomplete,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Popular from "../Images/Popular.png";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Switch from "@mui/material/Switch";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { BASE_URL } from "../Base_URL/BASE_URL";
const UploadDeals = () => {
  const [deals, setDeals] = useState(false);
  const [updateDeal, setUpdateDeal] = useState(false);
  const [id, setId] = useState("");
  //   const [deleteMeal, setDeleteMeal] = useState(false);
  //   const [deleteId, setDeleteId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  //   //states for form
  const [dealCategory, setDealCategory] = useState("");
  const [dealNumber, setDealNumber] = useState();
  const [dealTitle, setDealTitle] = useState("");
  const [dealPrice, setDealPrice] = useState();
  const [deal_id, setDeal_id] = useState();
  const [dealItems, setDealItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [dealData, setDealData] = useState([]);
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
  const notifyError = (error) =>
    toast.success(error, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  const handleDealItemsChange = (e) => {
    const itemsArray = e.target.value
      .split("\n")
      .filter((item) => item.trim() !== "");
    setDealItems(itemsArray);
  };
  // Add Deal
  const addDeal = async (e) => {
    e.preventDefault();
    if (
      !dealCategory ||
      dealNumber === 0 ||
      dealItems.length === 0 ||
      dealPrice === 0 ||
      deal_id === 0 ||
      !dealTitle
    ) {
      notifyError("🦄 Fill all the fields!");
      return;
    }
    setIsLoading(true);
    let dealData = {
      dealCategory,
      dealTitle,
      dealNumber,
      dealItems,
      dealPrice,
      deal_id,
    };
    console.log("dealData", dealData);
    try {
      const res = await axios.post(
        `${BASE_URL}/deal`,
        {
          deal_id: deal_id,
          dealTitle: dealTitle,
          dealCategory: dealCategory,
          dealNumber: dealNumber,
          dealItems: dealItems,
          dealPrice: dealPrice,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("uploadDeal Data", res);
      notifySuccess("🦄 Your item add Successfully");
      // Reset fields after success
      setDealCategory(""); // Reset mealCategory state
      setDealPrice(""); // Reset mealPrice state // Reset meal_id state
      setDealItems(""); // Reset mealTitle state
      setDealNumber(""); // Reset mealImage state (assuming it's a file input)
      setDealPrice("");
      setDealTitle("");
      setId("");
    } catch (error) {
      // console.log("error", error);
      notifyError("🦄 Something went wrong while uploading the deal!");
    } finally {
      setIsLoading(false);
    }
  };

  //Get Deal Function
  const getDeal = async () => {
    const res = await axios.get(`${BASE_URL}/getDeal`);
    console.log("getUploaded deal", res.data.data);
    setDealData(res.data.data);
  };
  useEffect(() => {
    getDeal();
  }, []);

  // update Deal
  const UpdateDeal = async (e) => {
    e.preventDefault();

    if (!id) {
      notifyError("🦄 Missing deal ID!");
      return;
    }

    if (
      !dealCategory ||
      dealNumber === 0 ||
      !dealItems ||
      dealItems.length === 0 ||
      dealPrice === 0 ||
      deal_id === 0 ||
      !dealTitle
    ) {
      notifyError("🦄 Fill all the fields!");
      return;
    }

    setIsLoading(true);

    const dealData = {
      dealCategory,
      dealNumber,
      dealItems, // Ensure this is an array
      dealPrice,
      deal_id,
      dealTitle,
    };

    try {
      const res = await axios.put(`${BASE_URL}/editDeal/${id}`, dealData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      notifySuccess("🦄 Your item updated Successfully");
      setUpdateDeal(false);
      getDeal();
    } catch (error) {
      notifyError("🦄 Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };
  // Delete Deal
  const DeleteMeal = async (del_id) => {
    setIsLoading(true);
    try {
      const res = await axios.delete(`${BASE_URL}/delDeal/${del_id}`);
      // console.log("res", res);
      notifySuccess("🦄 Your item deleted Successfully");
      getDeal();
    } catch (error) {
      // console.log("error", error);
      notifyError("🦄 Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  //   open edit meal
  const openEditModal = (meal) => {
    setDealNumber(meal.dealNumber);
    setDealCategory(meal.dealCategory);
    setDealTitle(meal.dealTitle);
    setDealItems(meal.dealItems.join("\n"));
    setDealPrice(meal.dealPrice);
    setDeal_id(meal.deal_id);
    setId(meal._id);

    setUpdateDeal(true);
  };
  return (
    <>
      {/* Add Deal modal */}
      <Modal
        size="md"
        isOpen={deals}
        toggle={() => setDeals(!deals)}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center", // Vertically centers the modal
          height: "100vh", // Full viewport height to center vertically
        }}
        contentClassName="custom-modal-content" // For further customization
      >
        <ModalHeader toggle={() => setDeals(!deals)}>
          <h1 className="jacques-francois-shadow-regular ">
            Add <span style={{ color: "rgb(295, 150, 0)" }}>Deals</span>
          </h1>
        </ModalHeader>
        <ModalBody>
          <form onSubmit={addDeal}>
            <Grid container spacing={1}>
              <Grid xs={6} item>
                <Autocomplete
                  placeholder="Category"
                  options={["Dinner", "Lunch"]}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Category"
                      variant="outlined"
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
                  )}
                  onChange={(event, value) => setDealCategory(value)}
                />
              </Grid>
              {/* 2 */}
              <Grid xs={6} item>
                <TextField
                  required
                  //   value={dealNumber}
                  label="Deal Number"
                  onChange={(e) => setDealNumber(e.target.value)}
                  placeholder="dealNo."
                  type="number"
                  variant="outlined"
                  fullWidth
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
              <Grid xs={12} item>
                <TextField
                  required
                  //   value={dealTitle}
                  label="name"
                  onChange={(e) => setDealTitle(e.target.value)}
                  placeholder="Deal Name"
                  variant="outlined"
                  fullWidth
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
              <Grid xs={12} item>
                <TextField
                  required
                  label="Deal Items"
                  onChange={handleDealItemsChange}
                  multiline
                  rows={3}
                  placeholder="Enter each item on a new line..."
                  variant="outlined"
                  fullWidth
                  InputLabelProps={{
                    style: { color: "rgb(295, 150, 0)" },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "rgb(295, 150, 0)" },
                      "&:hover fieldset": { borderColor: "rgb(295, 150, 0)" },
                      "&.Mui-focused fieldset": {
                        borderColor: "rgb(295, 150, 0)",
                      },
                    },
                    input: { color: "black" },
                  }}
                />
                <p>Total Items: {dealItems.length}</p>
              </Grid>
              <Grid xs={6} item>
                <TextField
                  required
                  label="DealPrice"
                  onChange={(e) => setDealPrice(e.target.value)}
                  placeholder="dealPrice"
                  variant="outlined"
                  fullWidth
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
              <Grid xs={6} item>
                <TextField
                  required
                  //   value={deal_id}
                  label="Deal_Id"
                  onChange={(e) => setDeal_id(e.target.value)}
                  placeholder="id"
                  type="number"
                  variant="outlined"
                  fullWidth
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
              {/* button */}
              <Grid
                xs={12}
                item
                style={{ display: "flex", justifyContent: "center" }}
              >
                <button className="button px-5" disabled={isLoading}>
                  {isLoading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Upload"
                  )}
                </button>
              </Grid>
            </Grid>
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
        </ModalBody>
      </Modal>
      {/* Edit deal modal */}
      <Modal
        size="md"
        isOpen={updateDeal}
        toggle={() => setUpdateDeal(!updateDeal)}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center", // Vertically centers the modal
          height: "100vh", // Full viewport height to center vertically
        }}
        contentClassName="custom-modal-content" // For further customization
      >
        <ModalHeader toggle={() => setUpdateDeal(!updateDeal)}>
          <h1 className="jacques-francois-shadow-regular ">
            Update <span style={{ color: "rgb(295, 150, 0)" }}>Deals</span>
          </h1>
        </ModalHeader>
        <ModalBody>
          <form onSubmit={UpdateDeal}>
            <Grid container spacing={1}>
              <Grid xs={6} item>
                <Autocomplete
                  value={dealCategory}
                  placeholder="Category"
                  options={["Dinner", "Lunch", "Desert", "Drink"]}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Category"
                      variant="outlined"
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
                  )}
                  onChange={(event, value) => setDealCategory(value)}
                />
              </Grid>

              <Grid xs={6} item>
                <TextField
                  required
                  value={dealNumber}
                  label="Deal Number"
                  onChange={(e) => setDealNumber(e.target.value)}
                  placeholder="Meal Name"
                  type="number"
                  variant="outlined"
                  fullWidth
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
              <Grid xs={12} item>
                <TextField
                  required
                  value={dealTitle}
                  label="Deal Name"
                  onChange={(e) => setDealTitle(e.target.value)}
                  placeholder="Deal Name"
                  variant="outlined"
                  fullWidth
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

              <Grid xs={12} item>
                <TextField
                  required
                  value={dealItems}
                  label="Deal Items"
                  onChange={handleDealItemsChange}
                  multiline
                  rows={3}
                  placeholder="Enter each item on a new line..."
                  variant="outlined"
                  fullWidth
                  InputLabelProps={{
                    style: { color: "rgb(295, 150, 0)" },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "rgb(295, 150, 0)" },
                      "&:hover fieldset": { borderColor: "rgb(295, 150, 0)" },
                      "&.Mui-focused fieldset": {
                        borderColor: "rgb(295, 150, 0)",
                      },
                    },
                    input: { color: "black" },
                  }}
                />
                <p>Total Items: {dealItems.length}</p>
              </Grid>
              <Grid xs={6} item>
                <TextField
                  required
                  value={dealPrice}
                  label="dealPrice"
                  onChange={(e) => setDealPrice(e.target.value)}
                  placeholder="Price"
                  type="number"
                  variant="outlined"
                  fullWidth
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
              <Grid xs={6} item>
                <TextField
                  required
                  value={deal_id}
                  label="deal_id"
                  type="number"
                  onChange={(e) => setDeal_id(e.target.value)}
                  variant="outlined"
                  placeholder="id"
                  fullWidth
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
              {/* button */}
              <Grid
                xs={12}
                item
                style={{ display: "flex", justifyContent: "center" }}
              >
                <button className="button px-5" disabled={isLoading}>
                  {isLoading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Update"
                  )}
                </button>
              </Grid>
            </Grid>
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
        </ModalBody>
      </Modal>
      {/* item Page */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
          boxSizing: "border-box",
        }}
      >
        <Card
          style={{
            width: "100%",
            maxWidth: "850px", // Sets a max-width for larger screens
            margin: "0 auto",
            padding: "20px",
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
              Meal Deals
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
              <button className="UButton" onClick={() => setDeals(true)}>
                Add Deals
              </button>

              <Grid item xs={5}>
                <TextField
                  label="Search"
                  placeholder="Item Name"
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
            <div className="container">
              <section className="row">
                {dealData.map((deal, id) => (
                  <div
                    key={id}
                    className="col-12 col-sm-6 col-md-4 text-center text-white jacques-francois-shadow-regular"
                  >
                    <h5
                      style={{
                        fontSize: "25px",
                        color: "rgb(295, 150, 0)",
                        fontWeight: "bolder",
                      }}
                    >
                      Deal No # {deal.dealNumber}
                    </h5>
                    <div
                      className="border border-1 border-warning-subtle rounded-circle py-4 px-5"
                      style={{ backgroundColor: "rgb(295, 150, 0)" }}
                    >
                      <h3 className="fw-bolder text-dark">{deal.dealTitle}</h3>

                      {deal.dealItems.map((e, i) => (
                        <h5 key={i}>{e}</h5>
                      ))}
                      <h5 className="text-dark">
                        Rs : <span className="fw-bold">{deal.dealPrice}</span>
                      </h5>
                      <div>
                        <button
                          className="btn btn-secondary me-1"
                          onClick={() => openEditModal(deal)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => DeleteMeal(deal._id)}
                        >
                          Del
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </section>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default UploadDeals;
