import { z } from "zod";
import { BaseFormCreateSchema } from "../form/create";
import { CategoryFormSchema } from "./category-form";

export const CategoryCreateSchema = CategoryFormSchema.merge(BaseFormCreateSchema);
export type ICategoryCreateSchema = z.infer<typeof CategoryCreateSchema>;
