import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import { Subcategory } from "./subcategory.model";

export class Category extends Model {
  public id!: number;
  public title!: string;
  public image!: string;
  public status!: "active" | "inactive";
  public order!: number | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  // For inner category property:
  public subcategories?: Subcategory[];
}

Category.init(
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
    order: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    sequelize,
    tableName: "categories",
    timestamps: true,
  }
);
