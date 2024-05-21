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

const updateProductInDB = async (productId: string, productData: TProduct) => {
  const result = await Product.findByIdAndUpdate(productId, productData, {
    new: true,
  });
  return result;
};

const deleteProductFromDB = async (productId: string) => {
  const result = await Product.deleteOne({ _id: productId });
  return result;
};

const searchProductsInDB = async (searchTerm: string) => {
  return await Product.find({
    name: { $regex: searchTerm, $options: 'i' },
  });
};

export const productServices = {
  createProductInDB,
  getAllProductsFromDB,
  getSingleProductByIDFromDB,
  updateProductInDB,
  deleteProductFromDB,
  searchProductsInDB,
};
