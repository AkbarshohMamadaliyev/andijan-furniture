import { Router } from "express";
import { productImageController } from "../../controllers/admin/productImage.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { upload } from "../../middlewares/upload.middleware";

const router = Router();

router.post("/", authMiddleware, upload.single("url"), productImageController.createProductImage);

router.get("/", authMiddleware, productImageController.getProductImages);

router.get("/:id", authMiddleware, productImageController.getProductImageById);

router.patch("/:id", authMiddleware, upload.single("url"), productImageController.updateProductImage);

router.delete("/:id", authMiddleware, productImageController.deleteProductImage);

export default router;
