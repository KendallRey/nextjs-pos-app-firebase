"use client";

import MuiButton from "@/components/button/Button";
import { setProductToCreate } from "@/redux/features/product/productDialogSlice";
import { useAppDispatch } from "@/redux/services/hooks";
import React, { useCallback } from "react";

const ProductAction = () => {
  const dispatch = useAppDispatch();

  const onClickAddProduct = useCallback(() => {
    dispatch(setProductToCreate({}));
  }, [dispatch]);

  return <MuiButton onClick={onClickAddProduct}>Add Product</MuiButton>;
};

export default ProductAction;
