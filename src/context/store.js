import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productSlice";
import loadingReducer from "./LoadingSlice";
import userReducer from "./userSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import cartReducer from "./Cart";
const persistconfig = {
  key: "root",
  storage,
};

const persistedUserReducer = persistReducer(persistconfig, userReducer);

export const store = configureStore({
  reducer: {
    products: productsReducer,
    loading: loadingReducer,
    user: persistedUserReducer,
    cart: cartReducer,
  },
  middleware: [thunk],
});

export const persistor = persistStore(store);
