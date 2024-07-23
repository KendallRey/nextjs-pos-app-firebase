import { z } from "zod";
import { BaseFormUpdateSchema } from "../form/update";
import { CategoryFormSchema } from "./category-form";

export const CategoryUpdateSchema = CategoryFormSchema.merge(BaseFormUpdateSchema);
export type ICategoryUpdateSchema = z.infer<typeof CategoryUpdateSchema>;
