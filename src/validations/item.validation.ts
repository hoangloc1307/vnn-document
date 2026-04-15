import z from 'zod';

export const itemSchema = z.object({
  itemCode: z.string().trim().min(1, 'Item code is required'),
  productCode: z.string().trim().min(1, 'Product code is required'),
  name: z.string().trim().min(1, 'Name is required'),
  unit: z.string().trim().min(1, 'Unit is required').toUpperCase(),
  baseUnit: z.string().trim().min(1, 'Base unit is required').toUpperCase(),
  conversionFactor: z.coerce
    .number<number>()
    .min(0, 'Conversion factor must be greater than or equal to 0'),
  deliveryOnBaseUnit: z.boolean(),
  note: z.string().trim().optional().nullable(),
  trackingType: z.enum(['LABEL', 'QUANTITY']),
});

export type ItemFormValues = z.infer<typeof itemSchema>;
