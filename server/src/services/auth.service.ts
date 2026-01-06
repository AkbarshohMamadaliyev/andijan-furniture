import { Admin } from "../models/auth.model";
import { AuthDto } from "../dtos/auth.dto";
import { CustomError } from "../helpers/customError.helper";
import { compareHashPassword } from "../helpers/bcrypt.helper";
import { generateAccessToken } from "../helpers/jwt.helper";

export const authService = {
  async login(data: AuthDto) {
    const { email, password } = data;

    const admin = await Admin.findOne({ where: { email: email }, raw: true });
    if (!admin)
      throw new CustomError(
        `Admin does not exist with this email: ${email}`,
        404
      );

    const isEqual = compareHashPassword(password, admin.password);
    if (!isEqual) throw new CustomError(`Incorrect password: ${password}`, 401);

    const targetAdmin = await Admin.findOne({
      where: { email: email },
      attributes: { exclude: ["password"] },
      raw: true,
    });

    const accessToken = generateAccessToken({ userId: admin.id });

    return { targetAdmin, accessToken };
  },
};
