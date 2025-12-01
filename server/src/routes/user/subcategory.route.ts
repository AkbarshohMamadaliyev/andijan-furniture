import { Router } from "express";
import { subcategoryController } from "../../controllers/user/subcategory.controller";

const router = Router();

router.get("/", subcategoryController.getSubcategories);

export default router;
