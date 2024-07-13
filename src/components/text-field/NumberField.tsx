import { NumberFormatValues, NumericFormat, NumericFormatProps } from "react-number-format";
import { forwardRef, useCallback } from "react";
import { NUMBER } from "../helper/field";

export type ICustomNumericFormatProps = {
  min?: number;
  max?: number;
};

type INumericFormatProps = {
  onChange: (event: { target: { name: string; value: any; type: string } }) => void;
  name: string;
} & Omit<NumericFormatProps, "onChange"> &
  ICustomNumericFormatProps;

export const NumericFormatCustom = forwardRef<HTMLInputElement, INumericFormatProps>((props, ref) => {
  const { onChange, min, max, name, ...other } = props;

  const handleValueChange = useCallback(
    (values: { value?: string }) => {
      onChange({
        target: {
          name: name,
          value: values.value !== undefined ? Number(values.value) : undefined,
          type: "number",
        },
      });
    },
    [onChange, name],
  );

  const handleIsAllowed = useCallback(
    (values: NumberFormatValues) => {
      const { floatValue } = values;
      if (!floatValue) {
        handleValueChange({ value: "0" });
        return false;
      }
      if (max !== undefined && floatValue >= max) {
        handleValueChange({ value: String(max) });
        return false;
      }
      if (min !== undefined && floatValue <= min) {
        handleValueChange({ value: String(min) });
        return false;
      }
      if (floatValue >= NUMBER.MONEY.LIMIT.MAX) {
        handleValueChange({ value: String(NUMBER.MONEY.LIMIT.MAX) });
        return false;
      }
      if (floatValue <= NUMBER.MONEY.LIMIT.MIN) {
        handleValueChange({ value: String(NUMBER.MONEY.LIMIT.MIN) });
        return false;
      }
      return true;
    },
    [min, max, handleValueChange],
  );

  return <NumericFormat {...other} getInputRef={ref} onValueChange={handleValueChange} isAllowed={handleIsAllowed} />;
});

NumericFormatCustom.displayName = "NumericFormatCustom";
