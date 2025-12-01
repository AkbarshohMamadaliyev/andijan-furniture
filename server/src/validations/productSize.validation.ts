import Joi from "joi";
import { CustomError } from "../helpers/customError.helper";

export class productSizeValidation {
  static async create(data: any) {
    return await Joi.object({
      length: Joi.string().trim().min(1).required().messages({
        "string.empty": "Length is required",
        "any.required": "Length is required",
      }),
      width: Joi.string().trim().min(1).required().messages({
        "string.empty": "Width is required",
        "any.required": "Width is required",
      }),
      height: Joi.string().trim().min(1).required().messages({
        "string.empty": "Height is required",
        "any.required": "Height is required",
      }),
      quantity: Joi.number().integer().min(0).required().messages({
        "number.base": "Quantity must be a number",
        "number.integer": "Quantity must be an integer",
        "number.min": "Quantity cannot be negative",
        "any.required": "Quantity is required",
      }),
      price: Joi.number().integer().min(0).required().messages({
        "number.base": "Price must be a number",
        "number.integer": "Price must be an integer",
        "number.min": "Price cannot be negative",
        "any.required": "Price is required",
      }),
      colorId: Joi.number().integer().positive().required().messages({
        "number.base": "Color ID must be a number",
        "number.integer": "Color ID must be an integer",
        "number.positive": "Color ID must be a positive number",
        "any.required": "Color ID is required",
      }),
    })
      .validateAsync(data, { abortEarly: false })
      .catch((err) => {
        throw new CustomError(err.message, 400);
      });
  }

  static async update(data: any) {
    return await Joi.object({
      length: Joi.string().trim().min(1).messages({
        "string.empty": "Length cannot be empty",
      }),
      width: Joi.string().trim().min(1).messages({
        "string.empty": "Width cannot be empty",
      }),
      height: Joi.string().trim().min(1).messages({
        "string.empty": "Height cannot be empty",
      }),
      quantity: Joi.number().integer().min(0).messages({
        "number.base": "Quantity must be a number",
        "number.integer": "Quantity must be an integer",
        "number.min": "Quantity cannot be negative",
      }),
      price: Joi.number().integer().min(0).messages({
        "number.base": "Price must be a number",
        "number.integer": "Price must be an integer",
        "number.min": "Price cannot be negative",
      }),
      colorId: Joi.number().integer().positive().messages({
        "number.base": "Color ID must be a number",
        "number.integer": "Color ID must be an integer",
        "number.positive": "Color ID must be a positive number",
      }),
    })
      .validateAsync(data, { abortEarly: false })
      .catch((err) => {
        throw new CustomError(err.message, 400);
      });
  }
}
