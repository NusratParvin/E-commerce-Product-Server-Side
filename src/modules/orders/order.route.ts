import express from 'express';
import { orderController } from './order.Controller';

const router = express.Router();

router.post('/', orderController.createOrder);

router.get('/', orderController.getAllOrders);
router.get('/email', orderController.getOrdersByEmail);

export const OrderRoutes = router;
