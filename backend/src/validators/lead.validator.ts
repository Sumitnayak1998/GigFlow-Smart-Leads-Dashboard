import { z } from "zod";

const statusEnum = z.enum(["New", "Contacted", "Qualified", "Lost"]);
const sourceEnum = z.enum(["Website", "Instagram", "Referral"]);

export const createLeadSchema = z.object({
  body: z.object({
    name: z.string().trim().min(2, "Name must be at least 2 characters"),
    email: z.string().trim().email("Invalid email address"),
    status: statusEnum.default("New"),
    source: sourceEnum,
  }),
});

export const updateLeadSchema = z.object({
  body: z
    .object({
      name: z.string().trim().min(2, "Name must be at least 2 characters").optional(),
      email: z.string().trim().email("Invalid email address").optional(),
      status: statusEnum.optional(),
      source: sourceEnum.optional(),
    })
    .refine((data) => Object.keys(data).length > 0, {
      message: "At least one field is required",
    }),
});

export const leadIdSchema = z.object({
  params: z.object({
    id: z.string().min(1, "Lead ID is required"),
  }),
});

export const leadQuerySchema = z.object({
  query: z.object({
    status: statusEnum.optional(),
    source: sourceEnum.optional(),
    search: z.string().trim().optional(),
    sort: z.enum(["latest", "oldest"]).optional(),
    page: z.string().optional(),
  }),
});
