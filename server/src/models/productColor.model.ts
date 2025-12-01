import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

export class ProductColor extends Model {
  public id!: number;
  public colorName!: string;
  public hex!: string;
  public totalQuantity!: number;
  public productId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

ProductColor.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    colorName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hex: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    totalQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "product_colors",
    timestamps: true,
  }
);
