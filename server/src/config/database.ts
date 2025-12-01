import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "3004",
  database: "furniture_backend",
  logging: false,
  define: {
    timestamps: true,
  },
});

export default sequelize;
