import { Request, Response, NextFunction } from "express";
import { productSizeValidation } from "../../validations/productSize.validation";
import { productSizeService } from "../../services/productSize.service";
import { CustomError } from "../../helpers/customError.helper";
import { ProductSize } from "../../models/productSize.model";

export const productSizeController = {
  async createProductSize(req: Request, res: Response, next: NextFunction) {
    try {
      const { length, width, height, quantity, price, colorId } =
        await productSizeValidation.create(req.body);

      const newProductSize = await productSizeService.createProductSize({
        length,
        width,
        height,
        quantity,
        price,
        colorId,
      });

      res
        .status(201)
        .json({ success: true, error: null, data: newProductSize });
    } catch (error) {
      next(error);
    }
  },

  async getProductSizes(_req: Request, res: Response, next: NextFunction) {
    try {
      const productSizes = await productSizeService.getProductSizes();
      res.status(200).json({ success: true, error: null, data: productSizes });
    } catch (error) {
      next(error);
    }
  },

  async getProductSizeById(req: Request, res: Response, next: NextFunction) {
    try {
      const productSizeId = Number(req.params?.id);
      const productSize = await productSizeService.getProductSizeById(
        productSizeId
      );

      if (!productSize) throw new CustomError("Product size not found", 404);

      res.status(200).json({ success: true, error: null, data: productSize });
    } catch (error) {
      next(error);
    }
  },

  async updateProductSize(req: Request, res: Response, next: NextFunction) {
    try {
      const productSizeId = Number(req.params?.id);
      const { length, width, height, quantity, price, colorId } =
        await productSizeValidation.update(req.body);

      const productSize = await ProductSize.findByPk(productSizeId);

      if (!productSize) throw new CustomError("Product size not found", 404);

      await productSizeService.updateProductSize(productSizeId, {
        length,
        width,
        height,
        quantity,
        price,
        colorId,
      });

      res.status(200).json({
        success: true,
        error: null,
        data: {
          ...productSize?.toJSON(),
          length,
          width,
          height,
          quantity,
          price,
          colorId,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  async deleteProductSize(req: Request, res: Response, next: NextFunction) {
    try {
      const productSizeId = Number(req.params?.id);
      const productSize = await ProductSize.findByPk(productSizeId);

      if (!productSize) throw new CustomError("Product size not found", 404);

      await productSizeService.deleteProductSize(productSizeId);

      res.status(200).json({ success: true, error: null, data: productSize });
    } catch (error) {
      next(error);
    }
  },
};
