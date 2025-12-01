import { Product } from "../models/product.model";
import { ProductSize } from "../models/productSize.model";
import { ProductColor } from "../models/productColor.model";
import { ProductImage } from "../models/productImage.model";

export const productService = {
  async createProduct(data: {
    name?: string;
    description?: string;
    discount?: number;
    status?: string;
    categoryId?: number;
    subcategoryId?: number;
  }) {
    return Product.create(data);
  },

  async getProducts() {
    return Product.findAll();
  },

  async getProductById(id: number) {
    return Product.findByPk(id, {
      include: [
        {
          model: ProductColor,
          as: "colors",
          attributes: { exclude: ["createdAt", "updatedAt"] },

          include: [
            {
              model: ProductSize,
              as: "sizes",
              attributes: { exclude: ["createdAt", "updatedAt"] },
            },
            {
              model: ProductImage,
              as: "images",
              attributes: { exclude: ["createdAt", "updatedAt"] },
            },
          ],
        },
      ],
    });
  },

  async updateProduct(
    id: number,
    data: {
      name?: string;
      description?: string;
      discount?: number;
      status?: string;
      categoryId?: number;
      subcategoryId?: number;
    }
  ) {
    return Product.update(data, { where: { id } });
  },

  async deleteProduct(id: number) {
    return Product.destroy({ where: { id } });
  },
};
