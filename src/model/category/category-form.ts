import { z } from "zod";
import { CategorySchema } from "./category";
import { stringRequired } from "../base/data";

export const CategoryFormSchema = CategorySchema.merge(
  z.object({
    name: stringRequired,
  }),
);
export type ICategoryFormSchema = z.infer<typeof CategoryFormSchema>;
