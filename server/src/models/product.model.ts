import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";

export class Product extends Model {
  public id!: number;
  public name!: string;
  public description!: string;
  public discount!: number;
  public status!: "active" | "inactive";
  public categoryId!: number;
  public subcategoryId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    discount: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      allowNull: false,
      defaultValue: "active",
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    subcategoryId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "products",
    timestamps: true,
  }
);
