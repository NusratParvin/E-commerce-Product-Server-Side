import express from 'express';
import { productController } from './product.controller';

const router = express.Router();

router.post('/', productController.createProduct);
router.get('/', productController.getAllProducts);
// router.get('/products/:productId', getProductById);
// router.put('/products/:productId', updateProduct);
// router.delete('/products/:productId', deleteProduct);
// router.get('/products/search', searchProducts);

export const ProductRoutes = router;
