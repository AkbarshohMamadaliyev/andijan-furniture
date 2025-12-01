import { Router } from "express";
import { categoryController } from "../../controllers/admin/category.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { upload } from "../../middlewares/upload.middleware";

const router = Router();

router.post("/", authMiddleware, upload.single("image"), categoryController.createCategory);

router.get("/", authMiddleware, categoryController.getCategories);

router.get("/:id", authMiddleware, categoryController.getCategoryById);

router.patch("/:id", authMiddleware, upload.single("image"), categoryController.updateCategory);

router.delete("/:id", authMiddleware, categoryController.deleteCategory);

export default router;
