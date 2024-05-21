import express from 'express';
import { productController } from './product.controller';

const router = express.Router();

router.post('/', productController.createProduct);
router.get('/', productController.getAllProducts);
router.get('/:productId', productController.getSingleProductByID);
router.put('/:productId', productController.updateProduct);
router.delete('/:productId', productController.deleteProduct);
// router.get('/products/search', searchProducts);

export const ProductRoutes = router;
