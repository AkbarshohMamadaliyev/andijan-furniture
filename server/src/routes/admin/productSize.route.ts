import { Router } from "express";
import { productSizeController } from "../../controllers/admin/productSize.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

router.post("/", authMiddleware, productSizeController.createProductSize);

router.get("/", authMiddleware, productSizeController.getProductSizes);

router.get("/:id", authMiddleware, productSizeController.getProductSizeById);

router.patch("/:id", authMiddleware, productSizeController.updateProductSize);

router.delete("/:id", authMiddleware, productSizeController.deleteProductSize);

export default router;
