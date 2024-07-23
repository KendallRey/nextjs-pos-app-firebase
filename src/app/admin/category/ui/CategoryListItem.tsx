import MuiButton from "@/components/button/Button";
import MuiCard from "@/components/card/Card";
import MuiCardActions from "@/components/card/CardActions";
import MuiCardContent from "@/components/card/CardContent";
import MuiChip from "@/components/chip/Chip";
import MuiDivider from "@/components/divider/Divider";
import MuiTypography from "@/components/typography/Typograph";
import { useUnsavedChangesForm } from "@/hooks/useUnsavedChangesForm";
import { ICategorySchema } from "@/model/category/category";
import { getCleanFormData, parseData } from "@/model/helper/data";
import { setCategoryToDelete, setCategoryToUpdate } from "@/redux/features/category/categoryDialogSlice";
import { setCategoryForm } from "@/redux/features/category/categoryFormSlice";
import { useAppDispatch } from "@/redux/services/hooks";
import { Card, CardActions, CardContent, Divider, Typography } from "@mui/material";
import { useCallback } from "react";

type ICategoryListItem = {
  category: ICategorySchema;
};

const CategoryListItem: React.FC<ICategoryListItem> = ({ category }) => {
  const { name, description } = category;

  const dispatch = useAppDispatch();
  const { setForm } = useUnsavedChangesForm();

  const onEdit = useCallback(() => {
    const parsedData = parseData<ICategorySchema>(category);
    const cleanCategory = getCleanFormData(parsedData);
    setForm(cleanCategory);
    dispatch(setCategoryForm(cleanCategory));
    dispatch(setCategoryToUpdate(parsedData));
  }, [dispatch, category, setForm]);

  const onDelete = useCallback(() => {
    const parsedData = parseData<ICategorySchema>(category);
    dispatch(setCategoryToDelete(parsedData));
  }, [dispatch, category]);

  return (
    <MuiCard className="max-w-[300px]">
      <MuiCardContent className="flex flex-col gap-2">
        <div>
          <MuiChip label={name} />
        </div>
        <MuiDivider />
        <MuiTypography variant={description ? "body2" : "caption"}>{description || "No Description"}</MuiTypography>
      </MuiCardContent>
      <MuiCardActions disableSpacing className="flex items-center justify-between">
        <MuiButton onClick={onEdit} variant="contained" size="small">
          Edit
        </MuiButton>
        <MuiButton onClick={onDelete} size="small" color="error">
          Delete
        </MuiButton>
      </MuiCardActions>
    </MuiCard>
  );
};

export default CategoryListItem;
