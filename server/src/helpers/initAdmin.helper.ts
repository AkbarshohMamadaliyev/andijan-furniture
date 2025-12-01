import { Admin } from "../models/auth.model";
import { getHashPassword } from "./bcrypt.helper";

export const initAdmin = async () => {
  const admin = await Admin.findAll();

  if (!admin.length) {
    const hashedPass = getHashPassword("admin2025");
    const newAdmin = await Admin.create({
      email: "admin@gmail.com",
      password: hashedPass,
    });
    console.log(newAdmin);
  }
};
