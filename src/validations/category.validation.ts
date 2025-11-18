import z from 'zod';

export const createCategorySchema = z.object({
  name: z.string().trim().min(1, 'Enter category name'),
  description: z.string().trim(),
  maintenanceIntervalHours: z.number().nullable(),
  status: z.boolean(),
});

export type CreateCategoryFormValues = z.infer<typeof createCategorySchema>;
