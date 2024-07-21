import { MuiFormSelect } from "@/components/select/Select";
import { MuiMoneyField } from "@/components/text-field/MoneyField";
import MuiTextField from "@/components/text-field/TextField";
import { useAppDispatch, useAppSelector } from "@/redux/services/hooks";
import { useCallback } from "react";
import { Checkbox, Divider, ListItemText, MenuItem } from "@mui/material";
import { ICategory } from "@/model/category";
import MuiChip from "@/components/chip/Chip";
import { MuiNumberField } from "@/components/text-field/NumberField";
import {
  editProductForm,
  selectProductCategory,
  setProductCategories,
} from "@/redux/features/product/productFormSlice";
import { selectDataArrayOfByIDs } from "@/components/helper/array";
import useFirestoreCollection from "@/firebase/hooks/useFirebaseCollection";
import { FIREBASE } from "@/firebase/constants/firebase";
import { _selectProductFormCategoryFormCategory } from "@/model/product/product-form-selector";
import { getInputRecord, getSelectMultipleInputRecord, InputRecord } from "@/redux/helper/input";
import ProductFormPreview from "./ProductPreview";
import MuiTypography from "@/components/typography/Typograph";

const ProductForm = () => {
  const dispatch = useAppDispatch();
  const { error, ...form } = useAppSelector((state) => state.productFormSlice);

  const formCategory = useAppSelector(_selectProductFormCategoryFormCategory);

  const { data: categories } = useFirestoreCollection<ICategory>(FIREBASE.COLLECTION.CATEGORY);

  const onChange = useCallback(
    (e: InputRecord) => {
      const record = getInputRecord(e, { zeroIsNull: true });
      dispatch(editProductForm(record));
    },
    [dispatch],
  );

  const onChangeCategory = useCallback(
    (e: InputRecord) => {
      const { list } = getSelectMultipleInputRecord(e);
      const _categories = selectDataArrayOfByIDs(categories, list);

      dispatch(setProductCategories(_categories));
    },
    [dispatch, categories],
  );

  const onRemoveCategory = useCallback(
    (item: ICategory) => {
      dispatch(selectProductCategory({ item, select: false }));
    },
    [dispatch],
  );

  return (
    <form className="flex items-center flex-wrap gap-12 ">
      <div className="flex flex-col gap-4">
        <MuiTypography>Preview</MuiTypography>
        <ProductFormPreview />
      </div>
      <Divider orientation="vertical" className="min-h-[500px] h-full" />
      <div className="flex flex-grow flex-col gap-3 max-w-[320px]">
        <MuiTextField label="Name *" name="name" value={form.name || ""} errorText={error?.name} onChange={onChange} />
        <MuiMoneyField
          label="Price *"
          name="price"
          value={form.price || ""}
          errorText={error?.price}
          onChange={onChange}
        />
        <MuiNumberField
          label="Stock *"
          name="stock"
          errorText={error?.stock}
          value={form.stock || ""}
          numericProps={{ thousandSeparator: true }}
          onChange={onChange}
        />
        <MuiTextField
          multiline
          label="Description"
          name="description"
          value={form.description || ""}
          rows={2}
          onChange={onChange}
        />
        <Divider />
        <div className="flex flex-wrap gap-2">
          {formCategory?.list.map((item, i) => (
            <MuiChip
              key={`${item.id}-${i}`}
              label={item.name}
              color="primary"
              onDelete={() => onRemoveCategory(item)}
            />
          ))}
        </div>
        <MuiFormSelect
          multiple
          value={formCategory.ids}
          label={"Category"}
          onChange={onChangeCategory}
          renderValue={() => formCategory.value}
        >
          {categories.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              <Checkbox checked={formCategory.ids.includes(item.id)} />
              <ListItemText primary={item.name} />
            </MenuItem>
          ))}
        </MuiFormSelect>
      </div>
    </form>
  );
};

export default ProductForm;
