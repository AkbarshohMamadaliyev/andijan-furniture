import { Request, Response, NextFunction } from "express";
import { productValidation } from "../../validations/product.validation";
import { productService } from "../../services/product.service";
import { CustomError } from "../../helpers/customError.helper";
import { Product } from "../../models/product.model";

export const productController = {
  async createProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, description, discount, status, categoryId, subcategoryId } =
        await productValidation.create(req.body);

      const newProduct = await productService.createProduct({
        name,
        description,
        discount,
        status,
        categoryId,
        subcategoryId,
      });
      
      res.status(201).json({ success: true, error: null, data: newProduct });
    } catch (error) {
      next(error);
    }
  },

  async getProducts(_req: Request, res: Response, next: NextFunction) {
    try {
      const products = await productService.getProducts();

      res.status(200).json({ success: true, error: null, data: products });
    } catch (error) {
      next(error);
    }
  },
  async getProductById(req: Request, res: Response, next: NextFunction) {
    try {
      const productId = Number(req.params?.id);
      const product = await productService.getProductById(productId);

      if (!product) throw new CustomError("Product not found", 404);

      res.status(200).json({ success: true, error: null, data: product });
    } catch (error) {
      next(error);
    }
  },

  async updateProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const productId = Number(req.params?.id);
      const { name, description, discount, status, categoryId, subcategoryId } =
        await productValidation.update(req.body);

      const product = await Product.findByPk(productId);

      if (!product) throw new CustomError("Product not found", 404);

      await productService.updateProduct(productId, {
        name,
        description,
        discount,
        status,
        categoryId,
        subcategoryId,
      });

      res.status(200).json({
        success: true,
        error: null,
        data: {
          ...product?.toJSON(),
          name,
          description,
          discount,
          status,
          categoryId,
          subcategoryId,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  async deleteProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const productId = Number(req.params?.id);
      const product = await Product.findByPk(productId);

      if (!product) throw new CustomError("Product not found", 404);

      await productService.deleteProduct(productId);

      res.status(200).json({ success: true, error: null, data: product });
    } catch (error) {
      next(error);
    }
  },
};
