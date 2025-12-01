import { Request, Response, NextFunction } from "express";
import { authService } from "../../services/auth.service";
import { authValidation } from "../../validations/auth.validation";

export const authController = {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = await authValidation.login(req.body);
      const { targetAdmin, accessToken } = await authService.login(email, password);

      res.status(201).json({ success: true, error: null, data: targetAdmin, accessToken });
    } catch (error) {
      next(error);
    }
  },
};
