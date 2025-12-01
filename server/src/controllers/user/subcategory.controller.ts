import { Request, Response, NextFunction } from "express";
import { subcategoryService } from "../../services/subcategory.service";
import { BASE_URL } from "../../helpers/baseUrl.helper";

export const subcategoryController = {
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
};
