import { UserDTO, userModel as UserModel, User } from "../users";
import bcrypt from "bcrypt";
import { ApiError, encodeToken } from "../../utils";
import { StatusCodes } from "http-status-codes";
import { decodeToken } from "../../utils";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class AuthService {
  static async registerGrocer(
    crudentials: Pick<User, "email" | "password" | "fullName" | "phoneNumber">
  ) {
    const salt = await bcrypt.genSalt(10);
    const hahsedPassword = await bcrypt.hash(crudentials.password, salt);
    const newUser = await prisma.grocer.create({
      data: {
        fullName: crudentials.fullName,
        email: crudentials.email,
        phoneNumber: crudentials.phoneNumber,
        password: hahsedPassword,
      },
    });

    const user = new User(newUser);

    const accessToken = encodeToken({
      id: user.id,
      email: user.email,
      role: "grocer",
    });

    return { ...user, accessToken };
  }

  static async loginGrocer(
    userCrudential: Pick<User, "phoneNumber" | "password">
  ) {
    const user = await prisma.grocer.findUnique({
      where: { phoneNumber: userCrudential.phoneNumber },
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

    const transformedUser = new User(user);
    const accessToken = encodeToken({
      id: user.id,
      email: user.email,
      role: "grocer",
    });
    return { ...transformedUser, accessToken };
  }

  static async verifyToken(token: string) {
    return decodeToken(token);
  }

  // static async editPassowrd(id: string, newPassword: string) {
  //   const salt = await bcrypt.genSalt(10);
  //   const hashedPassword = await bcrypt.hash(newPassword, salt);

  //   const { email, fullName, id } = (await UserModel.findByIdAndUpdate(
  //     id,
  //     {
  //       $set: { password: hashedPassword },
  //     },
  //     { new: true }
  //   )) as unknown as UserDTO;
  //   return { email, fullName, id: id };
  // }
}
