"use client";

import MuiButton from "@/components/button/Button";
import { setCategoryToCreate } from "@/redux/features/category/categoryDialogSlice";
import { useAppDispatch } from "@/redux/services/hooks";
import React, { useCallback } from "react";

const CategoryAction = () => {
  const dispatch = useAppDispatch();

  const onClickAddProduct = useCallback(() => {
    dispatch(setCategoryToCreate({}));
  }, [dispatch]);

  return <MuiButton onClick={onClickAddProduct}>Add Category</MuiButton>;
};

export default CategoryAction;
