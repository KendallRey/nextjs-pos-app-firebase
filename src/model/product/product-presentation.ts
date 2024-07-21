import { z } from "zod";
import { ProductSchema } from "./product";

export const ProductPresentation = ProductSchema.merge(
  z.object({
    categories: z.array(z.string()).optional(),
  }),
);
export type IProductPresentation = z.infer<typeof ProductPresentation>;
