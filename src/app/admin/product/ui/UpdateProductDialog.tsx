"use client";

import { useFormChanged } from "@/hooks/useFormChanged";
import useUnsavedChangesWarning from "@/hooks/useUnsavedChangesPrompt";
import { useAppDispatch, useAppSelector } from "@/redux/services/hooks";
import { useCallback } from "react";
import { clearProductToCreate, clearProductToUpdate } from "@/redux/features/product/productDialogSlice";
import MuiDialog from "@/components/dialog/Dialog";
import { getValidationErrors, transformData } from "@/model/helper/data";
import { appEnqueueSnackbar } from "@/components/helper/snackbar";
import { SUCCESS } from "@/firebase/constants/error";
import { clearProductForm, INITIAL_STATE, setProductFormError } from "@/redux/features/product/productFormSlice";
import { METHOD } from "@/components/constants/method";
import useFirestoreProductTransaction from "@/firebase/hooks/useFirestoreProduct";
import { ProductCreateSchema } from "@/model/product/product-create";
import ProductForm from "./ProductForm";
import { ProductUpdateSchema } from "@/model/product/product-update";

const UpdateProductDialog = () => {
  const dispatch = useAppDispatch();
  const productToUpdate = useAppSelector((state) => state.productDialogSlice.productToUpdate);

  const onClose = useCallback(() => {
    dispatch(clearProductToUpdate());
    dispatch(clearProductForm());
  }, [dispatch]);

  const { error, ...form } = useAppSelector((state) => state.productFormSlice);

  const { isChanged } = useFormChanged(form, INITIAL_STATE);
  useUnsavedChangesWarning(isChanged);

  const { updateProductApi } = useFirestoreProductTransaction();

  const onUpdateProduct = useCallback(async () => {
    if (!productToUpdate) return;
    const clearFormData = transformData(form, METHOD.POST);
    const data = await updateProductApi(productToUpdate.id, clearFormData);
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
      message: SUCCESS.PRODUCT_UPDATED,
    });
  }, [updateProductApi, productToUpdate, onClose, dispatch]);

  const onValidateProduct = useCallback(() => {
    const clearFormData = transformData(form, METHOD.PUT);
    const productItemValidation = ProductUpdateSchema.safeParse(clearFormData);
    if (!productItemValidation.success) {
      const error = getValidationErrors(productItemValidation);
      dispatch(setProductFormError(error));
      return;
    }
    onUpdateProduct();
  }, [dispatch, onUpdateProduct, form]);

  return (
    <MuiDialog
      title={"Update New Product"}
      onConfirm={onValidateProduct}
      onClose={onClose}
      confirmText="Update Product"
      variant="form"
      maxWidth="md"
      fullWidth
      open={Boolean(productToUpdate)}
      promptUnsaved={isChanged}
    >
      <ProductForm />
    </MuiDialog>
  );
};

export default UpdateProductDialog;
