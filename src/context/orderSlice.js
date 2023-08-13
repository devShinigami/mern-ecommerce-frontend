import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    order: {},
  },
  reducers: {
    setOrder: (state, action) => {
      state.order = action.payload;
      console.log(state.order);
    },
  },
});
export const { setOrder } = orderSlice.actions;
export default orderSlice.reducer;
