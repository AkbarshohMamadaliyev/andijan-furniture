import { Request, Response, NextFunction } from "express";
import { CustomError } from "../helpers/customError.helper";
import { verifyAccessToken } from "../helpers/jwt.helper";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req?.headers?.authorization || "";
    if (!token) {
      throw new CustomError("Token is missing", 401);
    }

    const decodedToken = verifyAccessToken(token.split(" ")?.[1]);
    if (!decodedToken) {
      throw new CustomError("Invalid or expired token", 401);
    }

    // @ts-ignore
    req.userId = decodedToken?.userId;
    next();
  } catch (error) {
    next(error);
  }
};
