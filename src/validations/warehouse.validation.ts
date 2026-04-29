import z from 'zod';

export const warehouseSchema = z.object({
  code: z.string().trim().min(1, 'Code is required'),
  name: z.string().trim().min(1, 'Name is required'),
  note: z.string().trim().optional().nullable(),
});

export type WarehouseFormValues = z.infer<typeof warehouseSchema>;
