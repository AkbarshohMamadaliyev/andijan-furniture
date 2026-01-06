import { Subcategory } from "../models/subcategory.model";
import { CreateSubcategoryDto, UpdateSubcategoryDto } from "../dtos/subcategory.dto";

export const subcategoryService = {
  async createSubcategory(data: CreateSubcategoryDto) {
    // @ts-expect-error
    return Subcategory.create(data);
  },

  async getSubcategories() {
    return Subcategory.findAll();
  },

  async getSubcategoryById(id: number) {
    return Subcategory.findByPk(id);
  },

  async updateSubcategory(id: number, data: UpdateSubcategoryDto) {
    return Subcategory.update(data, { where: { id } });
  },

  async deleteSubcategory(id: number) {
    return Subcategory.destroy({ where: { id } });
  },
};
