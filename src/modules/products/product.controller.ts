import { productServices } from './product.service';
import productValidationSchema from './product.validation';
import { Request, Response } from 'express';

const createProduct = async (req: Request, res: Response) => {
  try {
    const zodParsedData = productValidationSchema.parse(req.body);

    const result = await productServices.createProductInDB(zodParsedData);
    if (result) {
      const { _id, ...data } = result.toObject();

      res.status(200).json({
        success: true,
        message: 'Product created successfully!',
        data: data,
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Product not created',
        data: null,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error.message,
    });
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query;
    if (searchTerm) {
      const result = await productServices.searchProductsInDB(
        searchTerm as string,
      );

      const formattedProducts = result.map((singleProduct) => {
        const { _id, ...data } = singleProduct.toObject();
        return data;
      });
      if (formattedProducts.length > 0) {
        res.status(200).json({
          success: true,
          message: `Products matching search term '${searchTerm}' fetched successfully!`,
          data: formattedProducts,
        });
      } else {
        res.status(400).json({
          success: false,
          message: `No product found matching search term '${searchTerm}'`,
          data: null,
        });
      }
    } else {
      const result = await productServices.getAllProductsFromDB();

      if (result) {
        const formattedProducts = result.map((singleProduct) => {
          const { _id, ...data } = singleProduct.toObject();
          return data;
        });
        res.status(200).json({
          success: true,
          message: 'Products fetched successfully!',
          data: formattedProducts,
        });
      } else {
        res.status(400).json({
          success: false,
          message: 'Product not Found',
          data: null,
        });
      }
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error.message,
    });
  }
};

const getSingleProductByID = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await productServices.getSingleProductByIDFromDB(productId);
    console.log(result);
    if (result) {
      const { _id, ...data } = result.toObject();

      res.status(200).json({
        success: true,
        message: 'Product fetched successfully!',
        data: data,
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Product not found',
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error.message,
    });
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const zodParsedData = productValidationSchema.parse(req.body);
    const result = await productServices.updateProductInDB(
      productId,
      zodParsedData,
    );
    if (result) {
      const { _id, ...data } = result.toObject();
      res.status(200).json({
        success: true,
        message: 'Product updated successfully!',
        data: data,
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Product not found',
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error.message,
    });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await productServices.deleteProductFromDB(productId);

    if (result.deletedCount === 1) {
      // Check if a document was actually deleted
      res.status(200).json({
        success: true,
        message: 'Product deleted successfully!',
        data: null,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error.message,
    });
  }
};
export const productController = {
  createProduct,
  getAllProducts,
  getSingleProductByID,
  updateProduct,
  deleteProduct,
};
