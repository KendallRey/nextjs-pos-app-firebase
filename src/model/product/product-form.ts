import { z } from "zod";
import { moneyRequired } from "../base/data";
import { CategorySchema } from "../category/category";
import { ProductSchema } from "./product";

// #region Form Create
export const ProductFormSchema = ProductSchema.merge(
  z.object({
    categories: z.array(CategorySchema),
    price: moneyRequired,
  }),
);
export type IProductFormSchema = z.infer<typeof ProductFormSchema>;
