import { z } from "zod";
import { BaseFormCreateSchema } from "../form/create";
import { ProductSchema } from "./product";

export const ProductCreateSchema = BaseFormCreateSchema.merge(ProductSchema);
export type IProductCreateSchema = z.infer<typeof ProductCreateSchema>;
