import { Router } from "express";
import { productColorController } from "../../controllers/admin/productColor.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

router.post("/", authMiddleware, productColorController.createProductColor);

router.get("/", authMiddleware, productColorController.getProductColors);

router.get("/:id", authMiddleware, productColorController.getProductColorById);

router.patch("/:id", authMiddleware, productColorController.updateProductColor);

router.delete("/:id", authMiddleware, productColorController.deleteProductColor);

export default router;
