import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

export class ProductSize extends Model {
  public id!: number;
  public length!: string;
  public width!: string;
  public height!: string;
  public quantity!: number;
  public price!: number;
  public colorId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

ProductSize.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    length: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    width: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    colorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "product_sizes",
    timestamps: true,
  }
);
