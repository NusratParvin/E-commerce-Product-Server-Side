import { Request, Response } from 'express';
import orderValidationSchema from './order.validation';
import { orderServices } from './order.service';
import { Order } from './order.model';
import { z } from 'zod';

const createOrder = async (req: Request, res: Response) => {
  try {
    const zodParsedOrderData = orderValidationSchema.parse(req.body);

    const result = await orderServices.createOrderInDB(zodParsedOrderData);

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      console.log(error.errors[0].message);
      res.status(400).json({
        success: false,
        message: 'Validation error',
        // errors: error.errors[0].message,
        errors: error.errors.map((err) => ({
          path: err.path.join('.'),
          message: err.message,
        })),
      });
    } else if (error.message === 'Product not found') {
      res.status(400).json({
        success: false,
        message: 'Product not found',
      });
    } else if (
      error.message === 'Insufficient quantity available in inventory'
    ) {
      res.status(400).json({
        success: false,
        message: 'Insufficient quantity available in inventory',
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Something went wrong',
        error: error.message,
      });
    }
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;
    if (email) {
      const result = await orderServices.getOrdersByEmailFromDB(
        email as string,
      );
      if (result.length > 0) {
        const formattedOrders = result.map((singleOrder) => {
          const { _id, ...data } = singleOrder.toObject();
          return data;
        });
        res.status(200).json({
          success: true,
          message: `Orders fetched successfully for user email ${email}!`,
          data: formattedOrders,
        });
      } else {
        res.status(200).json({
          success: true,
          message: `Order not found for user email ${email}!`,
          data: null,
        });
      }
    } else {
      const result = await orderServices.getAllOrdersFromDB();
      if (result.length > 0) {
        const formattedOrders = result.map((singleOrder) => {
          const { _id, ...data } = singleOrder.toObject();
          return data;
        });
        res.status(200).json({
          success: true,
          message: 'Orders fetched successfully!',
          data: formattedOrders,
        });
      } else {
        res.status(200).json({
          success: true,
          message: 'No order found',
          data: null,
        });
      }
    }
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      console.log(error);
      res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.errors[0].message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Something went wrong',
        error: error.message,
      });
    }
  }
};

export const orderController = {
  createOrder,
  getAllOrders,
};
