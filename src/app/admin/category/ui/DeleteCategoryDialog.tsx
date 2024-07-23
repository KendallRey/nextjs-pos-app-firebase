"use client";

import MuiDialog from "@/components/dialog/Dialog";
import { useAppDispatch, useAppSelector } from "@/redux/services/hooks";
import { useCallback, useState } from "react";
import MuiTextField from "@/components/text-field/TextField";
import { Stack, Typography } from "@mui/material";
import useFirestoreCategoryTransaction from "@/firebase/hooks/useFirebaseCategory";
import { clearCategoryToDelete } from "@/redux/features/category/categoryDialogSlice";

const DeleteCategoryDialog = () => {
  const dispatch = useAppDispatch();
  const categoryToDelete = useAppSelector((state) => state.categoryDialogSlice.categoryToDelete);

  const { deleteCategoryApi } = useFirestoreCategoryTransaction();

  const [code, setCode] = useState("");

  const onChangeCode = useCallback((e: RCE) => {
    setCode(e.target.value);
  }, []);

  const onClose = useCallback(() => {
    setCode("");
    dispatch(clearCategoryToDelete());
  }, [dispatch]);

  const deleteCategory = useCallback(async () => {
    if (!categoryToDelete) return;
    await deleteCategoryApi(categoryToDelete.id);
    onClose();
  }, [dispatch, deleteCategoryApi, onClose, categoryToDelete]);

  return (
    <MuiDialog
      title={"Delete Category"}
      disableConfirm={code !== categoryToDelete?.name}
      onClose={onClose}
      onConfirm={deleteCategory}
      variant="delete"
      confirmText="Delete Category"
      maxWidth="xs"
      fullWidth
      open={Boolean(categoryToDelete)}
    >
      <Stack spacing={1}>
        <Typography variant="body2">
          Type <b>{categoryToDelete?.name}</b> to confirm.
        </Typography>
        <MuiTextField className="w-full" label={"Category *"} onChange={onChangeCode} value={code} />
      </Stack>
    </MuiDialog>
  );
};

export default DeleteCategoryDialog;
