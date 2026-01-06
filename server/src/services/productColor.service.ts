import { ProductColor } from "../models/productColor.model";
import { CreateProductColorDto, UpdateProductColorDto } from "../dtos/productColor.dto";

export const productColorService = {
  async createProductColor(data: CreateProductColorDto) {
    // @ts-expect-error
    return ProductColor.create(data);
  },

  async getProductColors() {
    return ProductColor.findAll();
  },

  async getProductColorById(id: number) {
    return ProductColor.findByPk(id);
  },

  async updateProductColor(id: number, data: UpdateProductColorDto) {
    return ProductColor.update(data, { where: { id } });
  },

  async deleteProductColor(id: number) {
    return ProductColor.destroy({ where: { id } });
  },
};
