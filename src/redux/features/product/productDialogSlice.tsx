import { IProductSchema } from "@/model/product/product";
import { REDUX } from "@/redux/constant/slice";
import { clearAction, setAction } from "@/redux/helper/action";
import { createSlice } from "@reduxjs/toolkit";

type IDataToModify = {
  productToCreate?: IProductSchema;
  productToUpdate?: IProductSchema;
  productToDelete?: IProductSchema;
};

const INITIAL_STATE: IDataToModify = {
  productToCreate: undefined,
  productToUpdate: undefined,
  productToDelete: undefined,
};

const productDialogSlice = createSlice({
  name: REDUX.SLICE.PRODUCT,
  initialState: INITIAL_STATE,
  reducers: {
    setProductToCreate: setAction<IDataToModify, Partial<IProductSchema>>("productToCreate"),
    clearProductToCreate: clearAction("productToCreate"),
    setProductToUpdate: setAction<IDataToModify, Partial<IProductSchema>>("productToUpdate"),
    clearProductToUpdate: clearAction("productToUpdate"),
    setProductToDelete: setAction<IDataToModify, Partial<IProductSchema>>("productToDelete"),
    clearProductToDelete: clearAction("productToDelete"),
  },
});

export const {
  setProductToCreate,
  clearProductToCreate,
  setProductToUpdate,
  clearProductToUpdate,
  setProductToDelete,
  clearProductToDelete,
} = productDialogSlice.actions;
export default productDialogSlice.reducer;
