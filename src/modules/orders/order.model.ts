import { Schema, model } from 'mongoose';
import { TOrder } from './order.interface';
import { Product } from '../products/product.model';

const orderSchema = new Schema<TOrder>(
  {
    email: { type: String, required: [true, 'email is required'] },
    productId: {
      type: String,
      required: [true, 'productId is required'],
      maxlength: 24,
    },
    price: { type: Number, required: [true, 'price is required'] },
    quantity: { type: Number, required: [true, 'quantity is required'] },
  },
  { versionKey: false },
);

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
