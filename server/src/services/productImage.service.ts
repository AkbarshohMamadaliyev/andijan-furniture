import { ProductImage } from "../models/productImage.model";

export const productImageService = {
  async createProductImage(data: { url?: string; colorId?: number }) {
    return ProductImage.create(data);
  },

  async getProductImages() {
    return ProductImage.findAll();
  },

  async getProductImageById(id: number) {
    return ProductImage.findByPk(id);
  },

  async updateProductImage(
    id: number,
    data: { url?: string; colorId?: number }
  ) {
    await ProductImage.update(data, { where: { id } });
    return ProductImage.findByPk(id); // yangilangan yozuvni qaytaradi
  },

  async deleteProductImage(id: number) {
    const productImage = await ProductImage.findByPk(id);
    if (!productImage) return null;
    await ProductImage.destroy({ where: { id } });
    return productImage;
  },
};
