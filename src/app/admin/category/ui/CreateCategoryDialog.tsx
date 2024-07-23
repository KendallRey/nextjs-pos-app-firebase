"use client";

import MuiDialog from "@/components/dialog/Dialog";
import { useAppDispatch, useAppSelector } from "@/redux/services/hooks";
import { useCallback } from "react";
import { getValidationErrors, transformData } from "@/model/helper/data";
import useFirestoreCategoryTransaction from "@/firebase/hooks/useFirebaseCategory";
import { METHOD } from "@/components/constants/method";
import { clearCategoryToCreate } from "@/redux/features/category/categoryDialogSlice";
import { clearCategoryForm, INITIAL_STATE, setCategoryFormError } from "@/redux/features/category/categoryFormSlice";
import CategoryForm from "./CategoryForm";
import { useFormChanged } from "@/hooks/useFormChanged";
import useUnsavedChangesWarning from "@/hooks/useUnsavedChangesPrompt";
import { CategoryCreateSchema } from "@/model/category/category-create";
import { appEnqueueSnackbar } from "@/components/helper/snackbar";
import { SUCCESS } from "@/firebase/constants/error";

const CreateCategoryDialog = () => {
  const dispatch = useAppDispatch();

  const categoryToCreate = useAppSelector((state) => state.categoryDialogSlice.categoryToCreate);
  const { error, ...form } = useAppSelector((state) => state.categoryFormSlice);

  const { isChanged } = useFormChanged(form, INITIAL_STATE);
  useUnsavedChangesWarning(isChanged);

  const { addCategoryApi } = useFirestoreCategoryTransaction();

  const onClose = useCallback(() => {
    dispatch(clearCategoryToCreate());
    dispatch(clearCategoryForm());
  }, [dispatch]);

  const onAddCategory = useCallback(async () => {
    const clearFormData = transformData(form, METHOD.POST);
    const data = await addCategoryApi(clearFormData);
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
  }, [dispatch, addCategoryApi, onClose, form]);

  const onValidateCategory = useCallback(() => {
    const clearFormData = transformData(form, METHOD.POST);
    const productItemValidation = CategoryCreateSchema.safeParse(clearFormData);
    if (!productItemValidation.success) {
      const error = getValidationErrors(productItemValidation);
      dispatch(setCategoryFormError(error));
      return;
    }
    onAddCategory();
  }, [dispatch, form, onAddCategory]);

  return (
    <MuiDialog
      title={"Create New Category"}
      onClose={onClose}
      onConfirm={onValidateCategory}
      variant="form"
      confirmText="Create Category"
      maxWidth="sm"
      fullWidth
      open={Boolean(categoryToCreate)}
      promptUnsaved={isChanged}
    >
      <CategoryForm />
    </MuiDialog>
  );
};

export default CreateCategoryDialog;
