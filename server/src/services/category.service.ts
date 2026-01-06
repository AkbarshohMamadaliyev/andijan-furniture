import { Category } from "../models/category.model";
import { Subcategory } from "../models/subcategory.model";
import { CreateCategoryDto, UpdateCategoryDto } from "../dtos/category.dto";

export const categoryService = {
  async createCategory(data: CreateCategoryDto) {
    // @ts-expect-error
    return await Category.create(data);
  },

  async getCategories(limit?: number) {
    return Category.findAll({
      order: [
        ["order", "ASC"],
        ["createdAt", "DESC"],
      ],
      ...(limit ? { limit } : {}),
    });
  },

  async getCategoryById(id: number | string) {
    return Category.findByPk(id, {
      include: [
        {
          model: Subcategory,
          as: "subcategories",
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
    });
  },

  async updateCategory(id: number, data: UpdateCategoryDto) {
    return Category.update(data, { where: { id } });
  },

  async deleteCategory(id: number) {
    return Category.destroy({ where: { id } });
  },
};
