// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   addToCart: [],
//   isLoading: false,
//   isError: false,
// };

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     addCart: (state, action) => {
//       const existingProductIndex = state.addToCart.findIndex(
//         (p) => p.id === action.payload.id
//         // (p) => console.log(p.id)
//       );
//       if (existingProductIndex === -1) {
//         // If the product is not in the cart, add it with count = 1
//         state.addToCart.push({ ...action.payload, count: 1 });
//       } else {
//         // If the product is already in the cart, increment its count
//         state.addToCart[existingProductIndex].count += 1;
//       }
//     },
//     removeAddToCart: (state, action) => {
//       state.addToCart = state.addToCart.filter(
//         (prod) => prod.id !== action.payload.id
//       );
//     },
//     cartIncrement: (state, action) => {
//       const product = state.addToCart.find((p) => p.id === action.payload);
//       if (product) {
//         product.count += 1;
//       }
//     },
//     cartDecrement: (state, action) => {
//       const product = state.addToCart.find((p) => p.id === action.payload);
//       if (product && product.count > 1) {
//         product.count -= 1;
//       }
//     },
//   },
// });

// const { actions, reducer } = cartSlice;
// export const { addCart, removeAddToCart, cartIncrement, cartDecrement } =
//   actions;

// export default reducer;
// ---------part 2--------
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  addToCart: [],
  isLoading: false,
  isError: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart: (state, action) => {
      const existingProductIndex = state.addToCart.findIndex(
        (p) => p._id === action.payload._id
      );
      // console.log(p.id);

      console.log("this is existing product index", existingProductIndex);
      if (existingProductIndex === -1) {
        // If the product is not in the cart, add it with count = 1
        state.addToCart.push({ ...action.payload, count: 1 });
      } else {
        // If the product is already in the cart, increment its count
        state.addToCart[existingProductIndex].count += 1;
      }
    },
    removeAddToCart: (state, action) => {
      state.addToCart = state.addToCart.filter(
        (prod) => prod._id !== action.payload._id
      );
    },
    cartIncrement: (state, action) => {
      const product = state.addToCart.find((p) => p._id == action.payload);
      if (product) {
        product.count += 1;
      }
    },
    cartDecrement: (state, action) => {
      const product = state.addToCart.find((p) => p._id === action.payload);
      if (product && product.count > 1) {
        product.count -= 1;
      }
    },
  },
});

const { actions, reducer } = cartSlice;
export const { addCart, removeAddToCart, cartIncrement, cartDecrement } =
  actions;

export default reducer;
