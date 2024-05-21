import { error } from 'console';
import { productServices } from './product.service';
import productValidationSchema from './product.validation';
import { Request, Response } from 'express';
import { Product } from './product.model';

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
      result: error.message,
    });
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  try {
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
        message: 'Product not created',
        data: null,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
    });
  }
};

const getSingleProductByID= async(req:Request
    ,res:Response)=>{
        const {productId}=req.params;
        const result = await Product.findOne({_id:})
    }

export const productController = {
  createProduct,
  getAllProducts,
};
