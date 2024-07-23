import { z } from "zod";
import { CategorySchema } from "./category";
import { stringOptional } from "../base/data";

export const CategoryPresentation = CategorySchema.merge(
  z.object({
    name: stringOptional,
  }),
);
export type ICategoryPresentation = z.infer<typeof CategoryPresentation>;
