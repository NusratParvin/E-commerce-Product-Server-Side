import { TProduct } from './product.interface';
import { Product } from './product.model';

const createProductInDB = async (productData: TProduct) => {
  const result = await Product.create(productData);
  return result;
};

const getAllProductsFromDB = async () => {
  const result = await Product.find();
  return result;
};

const getSingleProductByIDFromDB = async (productId: string) => {
  const result = await Product.findById(productId);

  return result;
};

export const productServices = {
  createProductInDB,
  getAllProductsFromDB,
  getSingleProductByIDFromDB,
};
