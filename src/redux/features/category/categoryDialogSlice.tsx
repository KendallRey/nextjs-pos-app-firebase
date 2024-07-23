import { ICategorySchema } from "@/model/category/category";
import { REDUX } from "@/redux/constant/slice";
import { clearAction, setAction } from "@/redux/helper/action";
import { createSlice } from "@reduxjs/toolkit";

type IDataToModify = {
  categoryToCreate?: ICategorySchema;
  categoryToUpdate?: ICategorySchema;
  categoryToDelete?: ICategorySchema;
};

const INITIAL_STATE: IDataToModify = {
  categoryToCreate: undefined,
  categoryToUpdate: undefined,
  categoryToDelete: undefined,
};

const categoryDialogSlice = createSlice({
  name: REDUX.SLICE.PRODUCT,
  initialState: INITIAL_STATE,
  reducers: {
    setCategoryToCreate: setAction<IDataToModify, Partial<ICategorySchema>>("categoryToCreate"),
    clearCategoryToCreate: clearAction("categoryToCreate"),
    setCategoryToUpdate: setAction<IDataToModify, Partial<ICategorySchema>>("categoryToUpdate"),
    clearCategoryToUpdate: clearAction("categoryToUpdate"),
    setCategoryToDelete: setAction<IDataToModify, Partial<ICategorySchema>>("categoryToDelete"),
    clearCategoryToDelete: clearAction("categoryToDelete"),
  },
});

export const {
  setCategoryToCreate,
  clearCategoryToCreate,
  setCategoryToUpdate,
  clearCategoryToUpdate,
  setCategoryToDelete,
  clearCategoryToDelete,
} = categoryDialogSlice.actions;
export default categoryDialogSlice.reducer;
