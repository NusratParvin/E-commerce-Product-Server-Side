import { date, z } from 'zod';
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

      if (result.length > 0) {
        const formattedProducts = result.map((singleProduct) => {
          const { _id, ...data } = singleProduct.toObject();
          return data;
        });
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

      if (result.length > 0) {
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

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await productServices.deleteProductFromDB(productId);

    if (result.deletedCount === 1) {
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
export const productController = {
  createProduct,
  getAllProducts,
  getSingleProductByID,
  updateProduct,
  deleteProduct,
};
