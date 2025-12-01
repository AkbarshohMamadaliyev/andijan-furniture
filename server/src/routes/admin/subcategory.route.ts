import { Router } from "express";
import { subcategoryController } from "../../controllers/admin/subcategory.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { upload } from "../../middlewares/upload.middleware";

const router = Router();

router.post("/", authMiddleware, upload.single("image"), subcategoryController.createSubcategory);

router.get("/", authMiddleware, subcategoryController.getSubcategories);

router.get("/:id", authMiddleware, subcategoryController.getSubcategoryId);

router.patch("/:id", authMiddleware, upload.single("image"), subcategoryController.updateSubcategory);

router.delete("/:id", authMiddleware, subcategoryController.deleteSubcategory);

export default router;
