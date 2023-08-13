import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productSlice";
import loadingReducer from "./LoadingSlice";
import userReducer from "./userSlice";
import shippingReducer from "./ShippingInfoSlice";
import orderReducer from "./orderSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import cartReducer from "./Cart";
const persistconfig = {
  key: "root",
  storage,
};

const persistedUserReducer = persistReducer(persistconfig, userReducer);
const persistedCartReducer = persistReducer(persistconfig, cartReducer);
const persistedShippingsReducer = persistReducer(
  persistconfig,
  shippingReducer
);
export const store = configureStore({
  reducer: {
    products: productsReducer,
    loading: loadingReducer,
    user: persistedUserReducer,
    cart: persistedCartReducer,
    shippingInfo: persistedShippingsReducer,
    order: orderReducer,
  },
  middleware: [thunk],
});

export const persistor = persistStore(store);
