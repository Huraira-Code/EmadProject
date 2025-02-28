import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./ProductSlice.js";
import addToCartReducer from "./AddToCart.js";
import ReservationCartReducer from "./ReservationCart.js";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig1 = {
  key: "cart",
  storage,
};
const persistConfig2 = {
  key: "reservation",
  storage,
};

const store = configureStore({
  reducer: {
    productReducer,
    addToCartReducer: persistReducer(persistConfig1, addToCartReducer),
    ReservationCartReducer: persistReducer(
      persistConfig2,
      ReservationCartReducer
    ),
  },
});

export const persistor = persistStore(store);
export default store;
