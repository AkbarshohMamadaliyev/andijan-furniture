import { Subcategory } from "../models/subcategory.model";

export const subcategoryService = {
  async createSubcategory(data: { title?: string; status?: string, image?: string, categoryId?: string }) {
    return Subcategory.create(data);
  },

  async getSubcategories() {
    return Subcategory.findAll();
  },

  async getSubcategoryById(id: number) {
    return Subcategory.findByPk(id);
  },

  async updateSubcategory(id: number, data: { title?: string; status?: string, image?: string, categoryId?: string }) {
    return Subcategory.update(data, { where: { id } });
  },

  async deleteSubcategory(id: number) {
    return Subcategory.destroy({ where: { id } });
  },
};
