import Joi from "joi";
import { CustomError } from "../helpers/customError.helper";

export class productValidation {
  static async create(data: any) {
    try {
      return await Joi.object({
        name: Joi.string().trim().min(1).required().messages({
          "string.empty": "Name is required",
          "any.required": "Name is required",
        }),
        description: Joi.string().allow("", null),
        discount: Joi.number().integer().min(0).max(100).messages({
          "number.base": "Discount must be a number",
          "number.integer": "Discount must be an integer",
          "number.min": "Discount cannot be less than 0",
          "number.max": "Discount cannot be more than 100",
        }),
        status: Joi.string().valid("active", "inactive").messages({
          "any.only": "Status must be either 'active' or 'inactive'",
        }),
        categoryId: Joi.number().integer().positive().messages({
          "number.base": "Category ID must be a number",
          "number.integer": "Category ID must be an integer",
          "number.positive": "Category ID must be a positive number",
        }),
        subcategoryId: Joi.number().integer().positive().messages({
          "number.base": "Subcategory ID must be a number",
          "number.integer": "Subcategory ID must be an integer",
          "number.positive": "Subcategory ID must be a positive number",
        }),
      }).validateAsync(data, { abortEarly: false });
    } catch (err: any) {
      throw new CustomError(err.message, 400);
    }
  }

  static async update(data: any) {
    try {
      return await Joi.object({
        name: Joi.string().trim().min(1).messages({
          "string.empty": "Name cannot be empty",
        }),
        description: Joi.string().allow("", null),
        discount: Joi.number().integer().min(0).max(100).messages({
          "number.base": "Discount must be a number",
          "number.integer": "Discount must be an integer",
          "number.min": "Discount cannot be less than 0",
          "number.max": "Discount cannot be more than 100",
        }),
        status: Joi.string().valid("active", "inactive").messages({
          "any.only": "Status must be either 'active' or 'inactive'",
        }),
        categoryId: Joi.number().integer().positive().messages({
          "number.base": "Category ID must be a number",
          "number.integer": "Category ID must be an integer",
          "number.positive": "Category ID must be a positive number",
        }),
        subcategoryId: Joi.number().integer().positive().messages({
          "number.base": "Subcategory ID must be a number",
          "number.integer": "Subcategory ID must be an integer",
          "number.positive": "Subcategory ID must be a positive number",
        }),
      }).validateAsync(data, { abortEarly: false });
    } catch (err: any) {
      throw new CustomError(err.message, 400);
    }
  }
}
