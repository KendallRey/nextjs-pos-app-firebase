import { z } from "zod";
import { BaseSchema } from "../base/base";

export const CategorySchema = BaseSchema.merge(
  z.object({
    name: z.string(),
  }),
);
export type ICategorySchema = z.infer<typeof CategorySchema>;
