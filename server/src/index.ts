import "dotenv/config";
import express from "express";
import { urlencoded } from "body-parser";
import cors from "cors";
import path from "path";

import sequelize from "./config/db";
import { initAdmin } from "./helpers/initAdmin.helper";
import { errorMiddleware } from "./middlewares/error.middleware";
import Relations from "./models/relations";

import authRoutes from "./routes/admin/auth.route";
import adminCategoryRoutes from "./routes/admin/category.route";
import adminSubcategoryRoutes from "./routes/admin/subcategory.route";
import adminProductRoutes from "./routes/admin/product.route";
import adminProductColorRoutes from "./routes/admin/productColor.route";
import adminProductSizeRoutes from "./routes/admin/productSize.route";
import adminProductImageRoutes from "./routes/admin/productImage.route";

import userCategoryRoutes from "./routes/user/category.route";
import userSubcategoryRoutes from "./routes/user/subcategory.route";

const port = process.env.PORT || 5001;
const app = express();

// enable cors:
app.use(cors());

// middleware:
app.use(express.json());
app.use(urlencoded({ extended: true }));

// check route:
app.get("/api", (_req, res) => {
  res.send("Server is working!");
});

// admin routes:
app.use("/api/admin/auth", authRoutes);
app.use("/api/admin/category", adminCategoryRoutes);
app.use("/api/admin/subcategory", adminSubcategoryRoutes);
app.use("/api/admin/product", adminProductRoutes);
app.use("/api/admin/product-color", adminProductColorRoutes);
app.use("/api/admin/product-size", adminProductSizeRoutes);
app.use("/api/admin/product-image", adminProductImageRoutes);

// user routes:
app.use("/api/user/category", userCategoryRoutes);
app.use("/api/user/subcategory", userSubcategoryRoutes);

// static route:
app.use("/api/files", express.static(path.join(__dirname, "./public/files")));

// error middleware:
app.use(errorMiddleware);

// start server:
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully");
    await sequelize.sync({ force: true });
    console.log("Models connected successfully");
    // await Product.sync({ force: true });

    Relations();

    await initAdmin();

    app.listen(port, () => {
      console.log(`Server running on port: ${port}`);
    });
  } catch (error) {
    console.error(`Failed to start server: ${error}`);
  }
};

startServer();
