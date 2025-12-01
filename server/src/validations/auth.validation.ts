import Joi from "joi";
import { CustomError } from "../helpers/customError.helper";

export class authValidation {
  static async login(data: any) {
    return await Joi.object({
      email: Joi.string().email().required().messages({
        "string.empty": "Email is required",
        "string.email": "Email format is invalid",
      }),
      password: Joi.string().min(5).alphanum().required().messages({
        "string.empty": "Password is required",
        "string.min": "Password must be at least 5 characters long",
        "string.alphanum": "Password must contain only letters and numbers",
      }),
    })
      .validateAsync(data)
      .catch((err) => {
        throw new CustomError(err.message, 400);
      });
  }
}
