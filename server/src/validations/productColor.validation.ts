import Joi from "joi";
import { CustomError } from "../helpers/customError.helper";

export class productColorValidation {
  static async create(data: any) {
    return await Joi.object({
      colorName: Joi.string().trim().min(1).required().messages({
        "string.empty": "Color name is required",
        "any.required": "Color name is required",
      }),
      hex: Joi.string()
        .trim()
        .pattern(/^#(?:[0-9a-fA-F]{3}){1,2}$/)
        .required()
        .messages({
          "string.empty": "Hex is required",
          "string.pattern.base":
            "Hex must be a valid hex color (e.g., #FFF or #FFFFFF)",
          "any.required": "Hex is required",
        }),
      totalQuantity: Joi.number().integer().min(0).required().messages({
        "number.base": "Total quantity must be a number",
        "number.integer": "Total quantity must be an integer",
        "number.min": "Total quantity cannot be negative",
        "any.required": "Total quantity is required",
      }),
      productId: Joi.number().integer().positive().required().messages({
        "number.base": "Product ID must be a number",
        "number.integer": "Product ID must be an integer",
        "number.positive": "Product ID must be a positive number",
        "any.required": "Product ID is required",
      }),
    })
      .validateAsync(data, { abortEarly: false })
      .catch((err) => {
        throw new CustomError(err.message, 400);
      });
  }

  static async update(data: any) {
    return await Joi.object({
      colorName: Joi.string().trim().min(1).messages({
        "string.empty": "Color name cannot be empty",
      }),
      hex: Joi.string()
        .trim()
        .pattern(/^#(?:[0-9a-fA-F]{3}){1,2}$/)
        .messages({
          "string.pattern.base":
            "Hex must be a valid hex color (e.g., #FFF or #FFFFFF)",
        }),
      totalQuantity: Joi.number().integer().min(0).messages({
        "number.base": "Total quantity must be a number",
        "number.integer": "Total quantity must be an integer",
        "number.min": "Total quantity cannot be negative",
      }),
      productId: Joi.number().integer().positive().messages({
        "number.base": "Product ID must be a number",
        "number.integer": "Product ID must be an integer",
        "number.positive": "Product ID must be a positive number",
      }),
    })
      .validateAsync(data, { abortEarly: false })
      .catch((err) => {
        throw new CustomError(err.message, 400);
      });
  }
}
