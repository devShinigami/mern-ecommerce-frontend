import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    productCount: 0,
    filterProducts: [],
    deleteProductId: "",
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setProductCount: (state, action) => {
      state.productCount = action.payload;
    },
    setFilterProducts: (state, action) => {
      state.filterProducts = action.payload;
    },
    setDeleteProductId: (state, action) => {
      state.deleteProductId = action.payload;
    },
  },
});

export const {
  setProducts,
  setProductCount,
  setFilterProducts,
  setDeleteProductId,
} = productSlice.actions;

export default productSlice.reducer;
