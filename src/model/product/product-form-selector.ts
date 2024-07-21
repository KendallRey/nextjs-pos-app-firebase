import { extractFieldValues, toIdsOfDataArray } from "@/components/helper/array";
import { RootState } from "@/redux/services/store";
import { createSelector } from "@reduxjs/toolkit";

const _selectProduFormCategory = (state: RootState) => state.productFormSlice;

export const _selectProduFormCategoryFormCategory = createSelector([_selectProduFormCategory], (form) => {
  const ids = toIdsOfDataArray(form.categories || []);
  const list = form.categories || [];
  const names = extractFieldValues(form.categories, "name");

  return {
    ids,
    list,
    names,
    value: names.join(", "),
  };
});
