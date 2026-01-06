import { ProductSize } from "../models/productSize.model";
import { CreateProductSizeDto, UpdateProductSizeDto } from "../dtos/productSize.dto";

export const productSizeService = {
  async createProductSize(data: CreateProductSizeDto) {
    // @ts-expect-error
    return ProductSize.create(data);
  },

  async getProductSizes() {
    return ProductSize.findAll();
  },

  async getProductSizeById(id: number) {
    return ProductSize.findByPk(id);
  },

  async updateProductSize(id: number, data: UpdateProductSizeDto) {
    return ProductSize.update(data, { where: { id } });
  },

  async deleteProductSize(id: number) {
    return ProductSize.destroy({ where: { id } });
  },
};
