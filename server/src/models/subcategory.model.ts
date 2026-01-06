import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";

export class Subcategory extends Model {
  public id!: number;
  public title!: string;
  public image!: string;
  public status!: "active" | "inactive";
  public categoryId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Subcategory.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
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
  },
  {
    sequelize,
    tableName: "subcategories",
    timestamps: true,
  }
);
