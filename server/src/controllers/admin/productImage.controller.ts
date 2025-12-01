import { Request, Response, NextFunction } from "express";
import { productImageValidation } from "../../validations/productImage.validation";
import { productImageService } from "../../services/productImage.service";
import { CustomError } from "../../helpers/customError.helper";
import { removeFile } from "../../helpers/removeFile.helper";

export const productImageController = {
  async createProductImage(req: Request, res: Response, next: NextFunction) {
    try {
      const { colorId } = await productImageValidation.create(req.body);

      if (!req.file?.filename) {
        throw new CustomError("Image file is required", 400);
      }

      const newProductImage = await productImageService.createProductImage({
        url: req.file.filename,
        colorId,
      });

      res
        .status(201)
        .json({ success: true, error: null, data: newProductImage });
    } catch (error) {
      next(error);
    }
  },

  async getProductImages(_req: Request, res: Response, next: NextFunction) {
    try {
      const images = await productImageService.getProductImages();
      res.status(200).json({ success: true, error: null, data: images });
    } catch (error) {
      next(error);
    }
  },

  async getProductImageById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const image = await productImageService.getProductImageById(id);
      if (!image) throw new CustomError("Product image not found", 404);

      res.status(200).json({ success: true, error: null, data: image });
    } catch (error) {
      next(error);
    }
  },

  async updateProductImage(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const { colorId } = await productImageValidation.update(req.body);

      const productImage = await productImageService.getProductImageById(id);
      if (!productImage) throw new CustomError("Product image not found", 404);

      // Agar yangi fayl yuklangan bo‘lsa, eski faylni o‘chir
      if (req.file?.filename && productImage.url) {
        await removeFile(productImage.url);
      }

      const updatedImage = await productImageService.updateProductImage(id, {
        url: req.file?.filename || productImage.url,
        colorId,
      });

      res.status(200).json({ success: true, error: null, data: updatedImage });
    } catch (error) {
      next(error);
    }
  },

  async deleteProductImage(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const productImage = await productImageService.deleteProductImage(id);

      if (!productImage) throw new CustomError("Product image not found", 404);

      // Faylni serverdan o‘chir
      if (productImage.url) {
        await removeFile(productImage.url);
      }

      res.status(200).json({ success: true, error: null, data: productImage });
    } catch (error) {
      next(error);
    }
  },
};
