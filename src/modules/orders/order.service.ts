import { TOrder } from './order.interface';
import { Order } from './order.model';

const createOrderInDB = async (orderData: TOrder) => {
  const order = new Order(orderData);
  const result = await order.save();
  return result;
};

const getAllOrdersFromDB = async () => {
  const result = await Order.find();
  return result;
};

const getOrdersByEmailFromDB = async (email: string) => {
  const result = await Order.find({ email });
  return result;
};

export const orderServices = {
  createOrderInDB,
  getAllOrdersFromDB,
  getOrdersByEmailFromDB,
};
