import { createSlice } from "@reduxjs/toolkit";

const shippingInfoSlice = createSlice({
  name: "ShippingInfo",
  initialState: {
    shippingInfo: {},
    paymentInfo: {},
  },
  reducers: {
    setShippingInfo: (state, action) => {
      state.shippingInfo = action.payload;
      console.log(state.shippingInfo);
    },
    setPaymentInfo: (state, action) => {
      state.paymentInfo = action.payload;
      console.log(state.paymentInfo);
    },
  },
});
export const { setShippingInfo, setPaymentInfo } = shippingInfoSlice.actions;
export default shippingInfoSlice.reducer;
