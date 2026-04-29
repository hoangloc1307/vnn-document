import z from 'zod';

export const zoneSchema = z.object({
  warehouseCode: z.string().trim().min(1, 'Warehouse code is required'),
  code: z.string().trim().min(1, 'Code is required'),
  name: z.string().trim().min(1, 'Name is required'),
  note: z.string().trim().optional().nullable(),
});

export type ZoneFormValues = z.infer<typeof zoneSchema>;
