"use client";

import MuiDialog from "@/components/dialog/Dialog";
import { useAppDispatch, useAppSelector } from "@/redux/services/hooks";
import { useCallback } from "react";
import { getValidationErrors, transformData } from "@/model/helper/data";
import useFirestoreCategoryTransaction from "@/firebase/hooks/useFirebaseCategory";
import { METHOD } from "@/components/constants/method";
import { clearCategoryToUpdate } from "@/redux/features/category/categoryDialogSlice";
import { clearCategoryForm, setCategoryFormError } from "@/redux/features/category/categoryFormSlice";
import CategoryForm from "./CategoryForm";
import { useFormChanged } from "@/hooks/useFormChanged";
import useUnsavedChangesWarning from "@/hooks/useUnsavedChangesPrompt";
import { appEnqueueSnackbar } from "@/components/helper/snackbar";
import { SUCCESS } from "@/firebase/constants/error";
import { useUnsavedChangesForm } from "@/hooks/useUnsavedChangesForm";
import { CategoryUpdateSchema } from "@/model/category/category-update";

const UpdateCategoryDialog = () => {
  const dispatch = useAppDispatch();

  const categoryToUpdate = useAppSelector((state) => state.categoryDialogSlice.categoryToUpdate);
  const { error, ...form } = useAppSelector((state) => state.categoryFormSlice);

  const { clearForm } = useUnsavedChangesForm();
  const { isChanged } = useFormChanged(form);
  useUnsavedChangesWarning(isChanged);

  const { updateCategoryApi } = useFirestoreCategoryTransaction();

  const onClose = useCallback(() => {
    dispatch(clearCategoryToUpdate());
    dispatch(clearCategoryForm());
    clearForm();
  }, [dispatch, clearForm]);

  const onUpdateCategory = useCallback(async () => {
    if (!categoryToUpdate) return;
    const clearFormData = transformData(form, METHOD.PUT);
    const data = await updateCategoryApi(categoryToUpdate.id, clearFormData);
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
      message: SUCCESS.CATEGORY_UPDATED,
    });
  }, [dispatch, updateCategoryApi, onClose, form]);

  const onValidateCategory = useCallback(() => {
    const clearFormData = transformData(form, METHOD.POST);
    const categoryValidation = CategoryUpdateSchema.safeParse(clearFormData);
    if (!categoryValidation.success) {
      const error = getValidationErrors(categoryValidation);
      dispatch(setCategoryFormError(error));
      return;
    }
    onUpdateCategory();
  }, [dispatch, form, onUpdateCategory]);

  return (
    <MuiDialog
      title={`Update ${categoryToUpdate?.name || "Category"}`}
      onClose={onClose}
      onConfirm={onValidateCategory}
      variant="form"
      confirmText="Update Category"
      maxWidth="sm"
      fullWidth
      open={Boolean(categoryToUpdate)}
      promptUnsaved={isChanged}
    >
      <CategoryForm />
    </MuiDialog>
  );
};

export default UpdateCategoryDialog;
