import { ProductSize } from "../models/productSize.model";

export const productSizeService = {
  async createProductSize(data: {
    length?: string;
    width?: string;
    height?: string;
    quantity?: number;
    price?: number;
    colorId?: number;
  }) {
    return ProductSize.create(data);
  },

  async getProductSizes() {
    return ProductSize.findAll();
  },

  async getProductSizeById(id: number) {
    return ProductSize.findByPk(id);
  },

  async updateProductSize(
    id: number,
    data: {
      length?: string;
      width?: string;
      height?: string;
      quantity?: number;
      price?: number;
      colorId?: number;
    }
  ) {
    return ProductSize.update(data, { where: { id } });
  },

  async deleteProductSize(id: number) {
    return ProductSize.destroy({ where: { id } });
  },
};
