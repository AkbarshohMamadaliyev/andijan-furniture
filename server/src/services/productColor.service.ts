import { ProductColor } from "../models/productColor.model";

export const productColorService = {
  async createProductColor(data: {
    colorName?: string;
    hex?: string;
    totalQuantity?: number;
    productId?: number;
  }) {
    return ProductColor.create(data);
  },

  async getProductColors() {
    return ProductColor.findAll();
  },

  async getProductColorById(id: number) {
    return ProductColor.findByPk(id);
  },

  async updateProductColor(
    id: number,
    data: {
      colorName?: string;
      hex?: string;
      totalQuantity?: number;
      productId?: number;
    }
  ) {
    return ProductColor.update(data, { where: { id } });
  },

  async deleteProductColor(id: number) {
    return ProductColor.destroy({ where: { id } });
  },
};
