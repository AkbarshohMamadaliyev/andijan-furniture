import { Router } from "express";
import { authController } from "../../controllers/admin/auth.controller";

const router = Router();

router.post("/login", authController.login);

export default router;
