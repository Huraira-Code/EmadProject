import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./ProductSlice.js";
import addToCartReducer from "./AddToCart.js";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "cart",
  storage,
};

const store = configureStore({
  reducer: {
    productReducer,
    addToCartReducer: persistReducer(persistConfig, addToCartReducer),
  },
});

export const persistor = persistStore(store);
export default store;
