import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../Base_URL/BASE_URL";

const initialState = {
  allProduct: [],
  isLoading: false,
  error: false,
};

const options = {
  method: "GET",
  url: "http://localhost:5005/api/v1/getMeal",
};

export const fetchProduct = createAsyncThunk(
  "product/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.request(options);
      console.log("API Response:", response.data.data); // Log the response
      return response.data.data; // Ensure the response is an array
    } catch (error) {
      console.log(error.message);
      return rejectWithValue(error.message);
    }
  }
);

// export const fetchProduct = createAsyncThunk(
//   "products/fetch",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(`${BASE_URL}/getMeal`);
//       return response.data;
//     } catch (error) {
//       console.log(error);
//       return rejectWithValue(error.message);
//     }
//   }
// );

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProduct.pending, (state) => {
      state.isLoading = true;
      console.log("pending");
    });
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.allProduct = action.payload;
      console.log("fulfilled", action.payload);
    });
    builder.addCase(fetchProduct.rejected, (state) => {
      state.isLoading = false;
      state.allProduct = [];
      state.error = true;
      console.log("rejected");
    });
  },
});

const { actions, reducer } = productSlice;
export default reducer;
