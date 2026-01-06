import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";

export class ProductImage extends Model {
  public id!: number;
  public url!: string;
  public colorId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

ProductImage.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    colorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "product_images",
    timestamps: true,
  }
);
