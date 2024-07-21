import { z } from "zod";
import { BaseSchema } from "./base/base";

export const CategorySchema = BaseSchema.merge(
  z.object({
    name: z.string(),
  }),
);
export type ICategory = z.infer<typeof CategorySchema>;
