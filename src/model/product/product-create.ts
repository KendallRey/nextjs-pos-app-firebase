import { z } from "zod";
import { BaseFormCreateSchema } from "../form/create";
import { ProductSchema } from "./product";
import { moneyRequired, numberRequired, stringRequired } from "../base/data";

export const ProductCreateSchema = BaseFormCreateSchema.merge(ProductSchema).merge(
  z.object({
    name: stringRequired,
    price: moneyRequired,
    stock: numberRequired,
  }),
);
export type IProductCreateSchema = z.infer<typeof ProductCreateSchema>;
