import { Request, Response, NextFunction } from "express";
import { subcategoryValidation } from "../../validations/subcategory.validation";
import { subcategoryService } from "../../services/subcategory.service";
import { CustomError } from "../../helpers/customError.helper";
import { Subcategory } from "../../models/subcategory.model";
import { removeFile } from "../../helpers/removeFile.helper";
import { BASE_URL } from "../../helpers/baseUrl.helper";

export const subcategoryController = {
  async createSubcategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, status, categoryId } = await subcategoryValidation.create(
        req.body
      );

      const newSubcategory = await subcategoryService.createSubcategory({
        title,
        image: req.file?.filename,
        status,
        categoryId,
      });

      res
        .status(201)
        .json({ success: true, error: null, data: newSubcategory });
    } catch (error) {
      next(error);
    }
  },

  async getSubcategories(_req: Request, res: Response, next: NextFunction) {
    try {
      const subcategories = await subcategoryService.getSubcategories();

      // To add base url in front of image path:
      const updatedSubcategories = subcategories.map((subcategory: any) => ({
        ...subcategory.dataValues,
        image: subcategory.image ? `${BASE_URL}${subcategory.image}` : null,
      }));

      res
        .status(200)
        .json({ success: true, error: null, data: updatedSubcategories });
    } catch (error) {
      next(error);
    }
  },

  async getSubcategoryId(req: Request, res: Response, next: NextFunction) {
    try {
      const subcategoryId = Number(req.params?.id);
      const subcategory = await subcategoryService.getSubcategoryById(
        subcategoryId
      );

      if (!subcategory) throw new CustomError("Subcategory not found", 404);

      // To add base url in front of image path:
      const updatedSubcategory = {
        ...subcategory.dataValues,
        image: subcategory.image ? `${BASE_URL}${subcategory.image}` : null,
      };

      res
        .status(200)
        .json({ success: true, error: null, data: updatedSubcategory });
    } catch (error) {
      next(error);
    }
  },

  async updateSubcategory(req: Request, res: Response, next: NextFunction) {
    try {
      const subcategoryId = Number(req.params?.id);
      const { title, status, categoryId } = await subcategoryValidation.update(
        req.body
      );
      const subcategory = await Subcategory.findByPk(subcategoryId);

      if (!subcategory) throw new CustomError("Subcategory not found", 404);

      if (req.file?.filename && subcategory?.dataValues?.image) {
        await removeFile(subcategory.dataValues.image);
      }

      await subcategoryService.updateSubcategory(subcategoryId, {
        title,
        image: req.file?.filename || subcategory.dataValues.image,
        status,
        categoryId,
      });

      res.status(200).json({
        success: true,
        error: null,
        data: {
          ...subcategory?.toJSON(),
          title,
          image: req.file?.filename || subcategory.dataValues.image,
          status,
          categoryId,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  async deleteSubcategory(req: Request, res: Response, next: NextFunction) {
    try {
      const subcategoryId = Number(req.params?.id);
      const subcategory = await Subcategory.findByPk(subcategoryId);

      if (!subcategory) throw new CustomError("Subcategory not found", 404);

      if (subcategory?.dataValues?.image) {
        await removeFile(subcategory.dataValues.image);
      }

      await subcategoryService.deleteSubcategory(subcategoryId);

      res.status(200).json({ success: true, error: null, data: subcategory });
    } catch (error) {
      next(error);
    }
  },
};
