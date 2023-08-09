import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: false,
  },
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload;
    },
  },
});
export const { setCart } = cartSlice.actions;
export default cartSlice.reducer;
