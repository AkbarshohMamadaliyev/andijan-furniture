import { Request, Response, NextFunction } from "express";
import { categoryService } from "../../services/category.service";
import { CustomError } from "../../helpers/customError.helper";
import { BASE_URL } from "../../helpers/baseUrl.helper";

export const categoryController = {
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
      const categoryId = req.params.id;
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
};
