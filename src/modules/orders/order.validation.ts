import { z } from 'zod';

const orderValidationSchema = z.object({
  email: z.string().email({ message: 'Invalid email format' }),
  productId: z
    .string()
    .length(24, { message: 'ProductId must be exactly 24 characters' }),

  price: z.number().positive({ message: 'Price must be a positive number' }),
  quantity: z
    .number()
    .positive({ message: 'Quantity must be a positive number' })
    .int({ message: 'Quantity must be an integer' }),
});

export default orderValidationSchema;
