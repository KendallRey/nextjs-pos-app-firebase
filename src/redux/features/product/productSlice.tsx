import { REDUX } from "@/redux/constant/slice";
import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: REDUX.SLICE.PRODUCT,
  initialState: {},
  reducers: {},
});

export default productSlice.reducer;
