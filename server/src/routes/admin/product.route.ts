import { Router } from "express";
import { productController } from "../../controllers/admin/product.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

router.post("/", authMiddleware, productController.createProduct);

router.get("/", authMiddleware, productController.getProducts);

router.get("/:id", authMiddleware, productController.getProductById);

router.patch("/:id", authMiddleware, productController.updateProduct);

router.delete("/:id", authMiddleware, productController.deleteProduct);

export default router;
