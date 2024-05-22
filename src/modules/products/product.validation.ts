import { z } from 'zod';

const variantValidationSchema = z.object({
  type: z.string(),
  value: z.string(),
});

const inventoryValidationSchema = z.object({
  quantity: z
    .number()
    .min(0, { message: 'quantity must be a non-negative number' }),

  inStock: z.boolean(),
});

const productValidationSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number().positive({ message: 'price must be a positive number' }),
  category: z.string(),
  tags: z.array(z.string()),
  variants: z.array(variantValidationSchema),
  inventory: inventoryValidationSchema,
});

export default productValidationSchema;
