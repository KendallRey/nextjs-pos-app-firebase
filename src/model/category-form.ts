import { z } from "zod";
import { CategorySchema } from "./category";

export const CategoryFormSchema = CategorySchema;
export type ICategoryFormSchema = z.infer<typeof CategoryFormSchema>;
