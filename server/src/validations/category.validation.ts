import Joi from "joi";
import { CustomError } from "../helpers/customError.helper";

export class categoryValidation {
  static async create(data: any) {
    return await Joi.object({
      title: Joi.string().trim().min(1).required().messages({
        "string.empty": "Title is required",
        "any.required": "Title is required",
      }),

      status: Joi.string().valid("active", "inactive").required().messages({
        "any.only": "Status must be either 'active' or 'inactive'",
        "any.required": "Status is required",
      }),

      order: Joi.number().integer().min(0).allow(null, "").optional().messages({
        "number.base": "Order must be a number",
        "number.integer": "Order must be an integer",
        "number.min": "Order must be at least 0",
      }),

      image: Joi.any().optional(),
    })
      .validateAsync(data, { abortEarly: false })
      .catch((err) => {
        throw new CustomError(err.message, 400);
      });
  }

  static async update(data: any) {
    return await Joi.object({
      title: Joi.string().trim().min(1).optional().messages({
        "string.empty": "Title cannot be empty",
      }),

      status: Joi.string().valid("active", "inactive").optional().messages({
        "any.only": "Status must be either 'active' or 'inactive'",
      }),

      order: Joi.number().integer().min(0).allow(null).optional().messages({
        "number.base": "Order must be a number",
        "number.integer": "Order must be an integer",
        "number.min": "Order must be at least 0",
      }),

      image: Joi.any().optional(),
    })
      .validateAsync(data, { abortEarly: false })
      .catch((err) => {
        throw new CustomError(err.message, 400);
      });
  }
}
