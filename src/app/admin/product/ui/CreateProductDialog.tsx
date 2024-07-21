"use client";

import { useFormChanged } from "@/hooks/useFormChanged";
import useUnsavedChangesWarning from "@/hooks/useUnsavedChangesPrompt";
import { useAppDispatch, useAppSelector } from "@/redux/services/hooks";
import { useCallback } from "react";
import { clearProductToCreate } from "@/redux/features/product/productDialogSlice";
import MuiDialog from "@/components/dialog/Dialog";
import { getValidationErrors, transformData } from "@/model/helper/data";
import { appEnqueueSnackbar } from "@/components/helper/snackbar";
import { SUCCESS } from "@/firebase/constants/error";
import { clearProductForm, INITIAL_STATE, setProductFormError } from "@/redux/features/product/productFormSlice";
import { METHOD } from "@/components/constants/method";
import useFirestoreProductTransaction from "@/firebase/hooks/useFirestoreProduct";
import { ProductCreateSchema } from "@/model/product/product-create";
import ProductForm from "./ProductForm";

const CreateProductDialog = () => {
  const dispatch = useAppDispatch();
  const productToCreate = useAppSelector((state) => state.productDialogSlice.productToCreate);

  const onClose = useCallback(() => {
    dispatch(clearProductToCreate());
    dispatch(clearProductForm());
  }, [dispatch]);

  const { error, ...form } = useAppSelector((state) => state.productFormSlice);

  const { isChanged } = useFormChanged(form, INITIAL_STATE);
  useUnsavedChangesWarning(isChanged);

  const { addProductApi } = useFirestoreProductTransaction();

  const onAddNewProduct = useCallback(async () => {
    const clearFormData = transformData(form, METHOD.POST);
    const data = await addProductApi(clearFormData);
    if (data.status === "failed") {
      appEnqueueSnackbar({
        variant: "error",
        message: data.message,
      });
      return;
    }
    onClose();
    appEnqueueSnackbar({
      variant: "success",
      message: SUCCESS.PRODUCT_CREATED,
    });
  }, [addProductApi, onClose, dispatch]);

  const onValidateProduct = useCallback(() => {
    const clearFormData = transformData(form, METHOD.POST);
    const productItemValidation = ProductCreateSchema.safeParse(clearFormData);
    if (!productItemValidation.success) {
      const error = getValidationErrors(productItemValidation);
      dispatch(setProductFormError(error));
    }
    onAddNewProduct();
  }, [dispatch, form, onAddNewProduct]);

  return (
    <MuiDialog
      title={"Create New Product"}
      onConfirm={onValidateProduct}
      onClose={onClose}
      confirmText="Save Product"
      variant="form"
      maxWidth="md"
      fullWidth
      open={Boolean(productToCreate)}
      promptUnsaved={isChanged}
    >
      <ProductForm />
    </MuiDialog>
  );
};

export default CreateProductDialog;
