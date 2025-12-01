import Joi from "joi";
import { CustomError } from "../helpers/customError.helper";

export class productImageValidation {
  static async create(data: any) {
    return await Joi.object({
      url: Joi.string().uri().messages({
        "string.uri": "Url must be a valid URI",
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
      url: Joi.string().uri().messages({
        "string.uri": "Url must be a valid URI",
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
