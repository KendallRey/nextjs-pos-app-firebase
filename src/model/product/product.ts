import { z } from "zod";
import { BaseSchema } from "../base/base";
import { CategorySchema } from "../category";

export const ProductSchema = BaseSchema.merge(
  z.object({
    name: z.string(),
    price: z.number(),
    categories: z.array(CategorySchema),
    stock: z.number(),
  }),
);
export type IProductSchema = z.infer<typeof ProductSchema>;
