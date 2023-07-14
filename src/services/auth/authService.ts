import { UserDTO, userModel as UserModel, User } from "../users";
import bcrypt from "bcrypt";
import { ApiError, encodeToken } from "../../utils";
import { StatusCodes } from "http-status-codes";
import { decodeToken } from "../../utils";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class AuthService {
  static async register(crudentials: Pick<User, "email" | "password">) {
    const salt = await bcrypt.genSalt(10);
    const hahsedPassword = await bcrypt.hash(crudentials.password, salt);
    const { id, email, username, role } = await prisma.user.create({
      data: {
        username: crudentials.email,
        email: crudentials.email,
        password: hahsedPassword,
      },
    });

    const accessToken = encodeToken({
      id,
      email,
      role,
    });

    return { id, email, username, accessToken, role };
  }

  static async login(userCrudential: Pick<User, "email" | "password">) {
    const user = await prisma.user.findUnique({
      where: { email: userCrudential.email },
    });

    if (!user)
      throw new ApiError(StatusCodes.UNAUTHORIZED, "wrong crudentials");

    const validate = await bcrypt.compare(
      userCrudential.password,
      user.password ?? ""
    );

    if (!validate) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, "wrong crudentials");
    }

    const { id, email, username, role } = user;
    const accessToken = encodeToken({
      id,
      email,
      role: role as unknown as string,
    });
    return { id, email, username, accessToken, role };
  }

  static async verifyToken(token: string) {
    return decodeToken(token);
  }

  static async editPassowrd(id: string, newPassword: string) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    const { email, username, _id } = (await UserModel.findByIdAndUpdate(
      id,
      {
        $set: { password: hashedPassword },
      },
      { new: true }
    )) as unknown as UserDTO;
    return { email, username, id: _id };
  }
}
