import { z } from "zod";
import { ProductSchema } from "./product";
import { moneyRequired, numberRequired, stringRequired } from "../base/data";
import { BaseFormUpdateSchema } from "../form/update";

export const ProductUpdateSchema = ProductSchema.merge(BaseFormUpdateSchema).merge(
  z.object({
    name: stringRequired,
    price: moneyRequired,
    stock: numberRequired,
    categories: z.array(z.any()),
  }),
);
export type IProductUpdateSchema = z.infer<typeof ProductUpdateSchema>;
