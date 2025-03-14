import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ReservationCart: [],
  isLoading: false,
  isError: false,
};

const ReservationSlice = createSlice({
  name: "reservation",
  initialState,
  reducers: {
    addCartToReservatioin: (state, action) => {
      const existingProductIndex = state.ReservationCart.findIndex(
        (p) => p._id === action.payload._id
      );
      // console.log(p.id);

      // console.log("this is existing product index", existingProductIndex);
      if (existingProductIndex === -1) {
        // If the product is not in the cart, add it with count = 1
        state.ReservationCart.push({ ...action.payload, count: 1 });
      } else {
        // If the product is already in the cart, increment its count
        state.ReservationCart[existingProductIndex].count += 1;
      }
    },
    removeReservationCart: (state, action) => {
      state.ReservationCart = state.ReservationCart.filter(
        (prod) => prod._id !== action.payload._id
      );
    },
    ReservationCartIncrement: (state, action) => {
      const product = state.ReservationCart.find(
        (p) => p._id == action.payload
      );
      if (product) {
        product.count += 1;
      }
    },
    ReservationCartDecrement: (state, action) => {
      const product = state.ReservationCart.find(
        (p) => p._id === action.payload
      );
      if (product && product.count > 1) {
        product.count -= 1;
      }
    },
    clearReservationCart: (state, action) => {
      state.ReservationCart = [];
    },
  },
});

const { actions, reducer } = ReservationSlice;
export const {
  addCartToReservatioin,
  removeReservationCart,
  ReservationCartIncrement,
  ReservationCartDecrement,
  clearReservationCart,
} = actions;

export default reducer;
