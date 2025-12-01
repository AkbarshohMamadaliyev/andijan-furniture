import Joi from "joi";
import { CustomError } from "../helpers/customError.helper";

export class subcategoryValidation {
  static async create(data: any) {
    return await Joi.object({
      title: Joi.string().trim().min(1).required().messages({
        "string.empty": "Title is required",
        "any.required": "Title is required",
      }),
      status: Joi.string().valid("active", "inactive").messages({
        "any.only": "Status must be either 'active' or 'inactive'",
      }),
      categoryId: Joi.number().integer().required().messages({
        "string.guid": "Category ID must be a valid integer",
        "any.required": "Category ID is required",
      }),
    })
      .validateAsync(data, { abortEarly: false })
      .catch((err) => {
        throw new CustomError(err.message, 400);
      });
  }

  static async update(data: any) {
    return await Joi.object({
      title: Joi.string().trim().min(1).messages({
        "string.empty": "Title cannot be empty",
      }),
      status: Joi.string().valid("active", "inactive").messages({
        "any.only": "Status must be either 'active' or 'inactive'",
      }),
      categoryId: Joi.number().integer().messages({
        "string.guid": "Category ID must be a valid integer",
      }),
    })
      .validateAsync(data, { abortEarly: false })
      .catch((err) => {
        throw new CustomError(err.message, 400);
      });
  }
}
