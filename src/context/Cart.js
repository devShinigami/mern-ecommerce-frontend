import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: false,
    products: [],
  },
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    addToCart: (state, action) => {
      state.products.push(action.payload);
      console.log(state.products);
    },
    deleteFromCart: (state, action) => {
      state.products = state.products?.filter(
        (item) => item.id !== action.payload.id
      );
      console.log(action);
    },
    resetCart: (state, action) => {
      state.products = [];
    },
    increaseQuantity: (state, action) => {
      const item = state.products?.find(
        (item) => item.id === action.payload.id
      );
      item.quantity++;
    },
    decreaseQuantity: (state, action) => {
      const item = state.products?.find(
        (item) => item.id === action.payload.id
      );
      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
      }
    },
  },
});
export const {
  setCart,
  addToCart,
  resetCart,
  deleteFromCart,
  increaseQuantity,
  decreaseQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
