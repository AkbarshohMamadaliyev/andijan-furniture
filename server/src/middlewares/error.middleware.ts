import { NextFunction, Request, Response } from "express";
import { CustomError } from "../helpers/customError.helper";

export const errorMiddleware = (err: CustomError, _req: Request, res: Response, _next: NextFunction) => {
  const status = Number(err.code) || 500;

  res.status(status).json({
    success: false,
    error: err.message || "Internal Server Error",
    data: err.data || null,
  });
};
