import { Schema, model } from 'mongoose';
import { TInventory, TProduct, TVariant } from './product.interface';

const variantSchema = new Schema<TVariant>(
  {
    type: { type: String, required: [true, 'type is required'] },
    value: { type: String, required: [true, 'value is required'] },
  },
  { _id: false },
);

const inventorySchema = new Schema<TInventory>(
  {
    quantity: { type: Number, required: [true, 'quantity is required'] },
    inStock: { type: Boolean, required: [true, 'inStock is required'] },
  },
  { _id: false },
);

const productSchema = new Schema<TProduct>(
  {
    name: { type: String, required: [true, 'name is required'] },
    description: { type: String, required: [true, 'description is required'] },
    price: { type: Number, required: [true, 'price is required'] },
    category: { type: String, required: [true, 'category is required'] },
    tags: { type: [String], required: [true, 'tags is required'] },
    variants: { type: [variantSchema], required: true },
    inventory: { type: inventorySchema, required: true },
  },
  { versionKey: false },
);

export const Product = model<TProduct>('Product', productSchema);
