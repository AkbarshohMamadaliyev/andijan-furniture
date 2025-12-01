import { Request, Response, NextFunction } from "express";
import { productColorValidation } from "../../validations/productColor.validation";
import { productColorService } from "../../services/productColor.service";
import { CustomError } from "../../helpers/customError.helper";
import { ProductColor } from "../../models/productColor.model";

export const productColorController = {
  async createProductColor(req: Request, res: Response, next: NextFunction) {
    try {
      const { colorName, hex, totalQuantity, productId } =
        await productColorValidation.create(req.body);

      const newProductColor = await productColorService.createProductColor({
        colorName,
        hex,
        totalQuantity,
        productId,
      });

      res
        .status(201)
        .json({ success: true, error: null, data: newProductColor });
    } catch (error) {
      next(error);
    }
  },

  async getProductColors(_req: Request, res: Response, next: NextFunction) {
    try {
      const productColors = await productColorService.getProductColors();

      res.status(200).json({ success: true, error: null, data: productColors });
    } catch (error) {
      next(error);
    }
  },

  async getProductColorById(req: Request, res: Response, next: NextFunction) {
    try {
      const productColorId = Number(req.params?.id);
      const productColor = await productColorService.getProductColorById(
        productColorId
      );

      if (!productColor) throw new CustomError("Product color not found", 404);

      res.status(200).json({ success: true, error: null, data: productColor });
    } catch (error) {
      next(error);
    }
  },

  async updateProductColor(req: Request, res: Response, next: NextFunction) {
    try {
      const productColorId = Number(req.params?.id);
      const { colorName, hex, totalQuantity, productId } =
        await productColorValidation.update(req.body);

      const productColor = await ProductColor.findByPk(productColorId);

      if (!productColor) throw new CustomError("product color not found", 404);

      await productColorService.updateProductColor(productColorId, {
        colorName,
        hex,
        totalQuantity,
        productId,
      });

      res.status(200).json({
        success: true,
        error: null,
        data: {
          ...productColor?.toJSON(),
          colorName,
          hex,
          totalQuantity,
          productId,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  async deleteProductColor(req: Request, res: Response, next: NextFunction) {
    try {
      const productColorId = Number(req.params?.id);
      const productColor = await ProductColor.findByPk(productColorId);

      if (!productColor) throw new CustomError("Product color not found", 404);

      await productColorService.deleteProductColor(productColorId);

      res.status(200).json({ success: true, error: null, data: productColor });
    } catch (error) {
      next(error);
    }
  },
};
