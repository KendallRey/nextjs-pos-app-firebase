import { z } from "zod";
import { moneyRequired, numberRequired, stringRequired } from "../base/data";
import { BaseFormCreateSchema } from "../form/create";

// Create Validation
export const ProductItemCreateSchema = BaseFormCreateSchema.merge(
  z.object({
    categories: z.array(z.string()).optional(),
    name: stringRequired,
    price: moneyRequired,
    stock: numberRequired,
  }),
);
export type IProductItemCreateSchema = z.infer<typeof ProductItemCreateSchema>;
