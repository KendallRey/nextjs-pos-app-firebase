import { createSlice } from "@reduxjs/toolkit";
import {
  setFormAction,
  setFormErrorAction,
  clearFormErrorAction,
  selectItemAction,
  processFormAction,
  setArrayAction,
} from "@/redux/helper/action";
import { REDUX } from "@/redux/constant/slice";
import { IProductFormSchema } from "@/model/product/product-form";
import { ICategorySchema } from "@/model/category/category";

type IProductFormState = IReduxFormState<IProductFormSchema>;

export const INITIAL_STATE: IProductFormState = {
  error: {},
  categories: [],
};

const productFormSlice = createSlice({
  name: REDUX.SLICE.PRODUCT_FORM,
  initialState: INITIAL_STATE,
  reducers: {
    setProductForm: setFormAction<IProductFormState>,
    editProductForm: processFormAction<IProductFormState>(INITIAL_STATE),
    setProductFormError: setFormErrorAction<IProductFormState>,
    setProductCategories: setArrayAction<IProductFormState>("categories"),
    selectProductCategory: selectItemAction<IProductFormState, ICategorySchema>("categories"),
    clearProductFormError: clearFormErrorAction,
    clearProductForm: () => INITIAL_STATE,
  },
});

export const {
  setProductForm,
  editProductForm,
  setProductCategories,
  selectProductCategory,
  setProductFormError,
  clearProductFormError,
  clearProductForm,
} = productFormSlice.actions;
export default productFormSlice.reducer;
