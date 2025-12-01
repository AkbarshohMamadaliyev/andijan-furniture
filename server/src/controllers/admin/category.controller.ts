import { Request, Response, NextFunction } from "express";
import { Category } from "../../models/category.model";
import { removeFile } from "../../helpers/removeFile.helper";
import { categoryService } from "../../services/category.service";
import { CustomError } from "../../helpers/customError.helper";
import { categoryValidation } from "../../validations/category.validation";
import { BASE_URL } from "../../helpers/baseUrl.helper";

export const categoryController = {
  async createCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, status, order } = await categoryValidation.create(
        req.body
      );

      const newCategory = await categoryService.createCategory({
        title,
        image: req.file?.filename,
        status,
        order: order ? Number(order) : null,
      });

      res.status(201).json({ success: true, error: null, data: newCategory });
    } catch (error) {
      next(error);
    }
  },

  async getCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const limit = req.query.limit ? Number(req.query.limit) : undefined;

      const categories = await categoryService.getCategories(limit);

      // To add base url in front of image path:
      const updatedCategories = categories.map((category: any) => ({
        ...category.dataValues,
        image: category.image ? `${BASE_URL}${category.image}` : null,
      }));

      res
        .status(200)
        .json({ success: true, error: null, data: updatedCategories });
    } catch (error) {
      next(error);
    }
  },

  async getCategoryById(req: Request, res: Response, next: NextFunction) {
    try {
      const categoryId = Number(req.params?.id);

      const category = await categoryService.getCategoryById(categoryId);

      if (!category) throw new CustomError("Category not found", 404);

      // To add base url in front of image path:
      const updatedCategory = {
        ...category.dataValues,
        image: category.image ? `${BASE_URL}${category.image}` : null,
        subcategories: category.subcategories
          ? category.subcategories.map((sub: any) => ({
              ...sub.dataValues,
              image: sub.image ? `${BASE_URL}${sub.image}` : null,
            }))
          : null,
      };

      res
        .status(200)
        .json({ success: true, error: null, data: updatedCategory });
    } catch (error) {
      next(error);
    }
  },

  async updateCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const categoryId = Number(req.params?.id);
      const { title, status, order } = await categoryValidation.update(
        req.body
      );
      const category = await Category.findByPk(categoryId);

      if (!category) throw new CustomError("Category not found", 404);

      if (req.file?.filename && category?.dataValues?.image) {
        await removeFile(category?.dataValues?.image);
      }

      await categoryService.updateCategory(categoryId, {
        title,
        image: req.file?.filename || category.dataValues.image,
        status,
        order: order !== undefined && order !== "" ? Number(order) : category.dataValues.order,
        // order: order ?? category.dataValues.order,
      });

      res.status(200).json({
        success: true,
        error: null,
        data: {
          ...category?.toJSON(),
          title,
          image: req.file?.filename || category.dataValues.image,
          status,
          order: order ?? category.dataValues.order,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  async deleteCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const categoryId = Number(req.params?.id);
      const category = await Category.findByPk(categoryId);

      if (!category) throw new CustomError("Category not found", 404);

      if (category?.dataValues?.image) {
        await removeFile(category?.dataValues?.image);
      }

      await categoryService.deleteCategory(categoryId);

      res.status(200).json({ success: true, error: null, data: category });
    } catch (error) {
      next(error);
    }
  },
};
