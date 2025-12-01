import { Category } from "./category.model";
import { Subcategory } from "./subcategory.model";
import { Product } from "./product.model";
import { ProductColor } from "./productColor.model";
import { ProductSize } from "./productSize.model";
import { ProductImage } from "./productImage.model";

export default function Relations() {
  // Category to Subcategory (One to Many):
  Category.hasMany(Subcategory, {
    as: "subcategories",
    foreignKey: { name: "categoryId", allowNull: false },
  });

  Subcategory.belongsTo(Category, {
    foreignKey: { name: "categoryId", allowNull: false },
  });

  // Product to ProductColor (One to Many):
  Product.hasMany(ProductColor, {
    as: "colors",
    foreignKey: { name: "productId", allowNull: false },
  });

  ProductColor.belongsTo(Product, {
    foreignKey: { name: "productId", allowNull: false },
  });

  // ProductColor to ProductSize (One to Many):
  ProductColor.hasMany(ProductSize, {
    as: "sizes",
    foreignKey: { name: "colorId", allowNull: false },
  });

  ProductSize.belongsTo(ProductColor, {
    foreignKey: { name: "colorId", allowNull: false },
  });

  // ProductColor to ProductImage (One to Many):
  ProductColor.hasMany(ProductImage, {
    as: "images",
    foreignKey: { name: "colorId", allowNull: false },
  });

  ProductImage.belongsTo(ProductColor, {
    foreignKey: { name: "colorId", allowNull: false },
  });
}