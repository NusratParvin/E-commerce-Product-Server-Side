import { Schema, model } from 'mongoose';
import { TOrder } from './order.interface';
import { Product } from '../products/product.model';

const orderSchema = new Schema<TOrder>({
  email: { type: String, required: true },
  productId: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

orderSchema.pre('save', async function (next) {
  const product = await Product.findById(this.productId);
  if (!product) {
    throw Error('Product not found');
  }

  if (this.quantity > product.inventory.quantity) {
    throw Error('Insufficient quantity available in inventory');
  }

  product.inventory.quantity -= this.quantity;
  if (product.inventory.quantity === 0) {
    product.inventory.inStock = false;
  }
  const result = await product.save();

  next();
});

export const Order = model<TOrder>('Order', orderSchema);
