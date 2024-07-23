import MuiTextField from "@/components/text-field/TextField";
import { editCategoryForm } from "@/redux/features/category/categoryFormSlice";
import { InputRecord, getInputRecord } from "@/redux/helper/input";
import { useAppDispatch, useAppSelector } from "@/redux/services/hooks";
import { useCallback } from "react";

const CategoryForm = () => {
  const dispatch = useAppDispatch();

  const { error, ...form } = useAppSelector((state) => state.categoryFormSlice);

  const onChange = useCallback(
    (e: InputRecord) => {
      const record = getInputRecord(e);
      dispatch(editCategoryForm(record));
    },
    [dispatch],
  );

  return (
    <form className="flex flex-col gap-4">
      <MuiTextField label="Name *" name="name" value={form.name || ""} onChange={onChange} errorText={error?.name} />
      <MuiTextField
        multiline
        label="Description"
        name="description"
        value={form.description || ""}
        rows={2}
        onChange={onChange}
        errorText={error?.description}
      />
    </form>
  );
};

export default CategoryForm;
