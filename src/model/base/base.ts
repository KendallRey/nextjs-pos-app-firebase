import { z } from "zod";
import { ModelSchema } from "./model";

export const BaseSchema = z
  .object({
    created_at: z.date(),
    updated_at: z.date(),
    deleted_at: z.date().nullable(),
    archived: z.boolean(),
    description: z.string().nullable().optional(),
    remarks: z.string().nullable().optional(),
  })
  .merge(ModelSchema);
