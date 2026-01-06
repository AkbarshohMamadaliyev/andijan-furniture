import { ProductImage } from "../models/productImage.model";
import { CreateProductImageDto, UpdateProductImageDto } from "../dtos/productImage.dto";

export const productImageService = {
  async createProductImage(data: CreateProductImageDto) {
    // @ts-expect-error
    return ProductImage.create(data);
  },

  async getProductImages() {
    return ProductImage.findAll();
  },

  async getProductImageById(id: number) {
    return ProductImage.findByPk(id);
  },

  async updateProductImage(id: number, data: UpdateProductImageDto) {
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
