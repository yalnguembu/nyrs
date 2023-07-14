import { userModel as UserModel } from "./userModel";
import { User, type UserDTO, type UpdateUserDTO } from ".";
import { UserSchema } from "../../utils";

export abstract class UserSevices {
  // static async getById(id: string) {
  //   const { email, fullName, id, picture } = (await UserModel.findById(
  //     id
  //   )) as unknown as UserDTO;
  //   return { email, fullName, id: id, picture };
  // }

  // static async getByEmail(userEmail: string) {
  //   const finedUser = await UserModel.findOne({
  //     email: userEmail,
  //   }).exec();
  //   if (finedUser)
  //     return new User(finedUser as unknown as UserSchema).details();
  //   return "";
  // }

  // static async getAll() {
  //   const users = (await UserModel.find()) as unknown as UserDTO[];
  //   return users.map((user: UserDTO) => {
  //     const { email, fullName, id, role, picture } = user;
  //     return { email, fullName, id: id, role, picture };
  //   });
  // }

  // static async update(id: string, user: UpdateUserDTO) {
  //   const { email, fullName, id } = (await UserModel.findByIdAndUpdate(
  //     id,
  //     { $set: user },
  //     { new: true }
  //   )) as unknown as UserDTO;
  //   return { email, fullName, id: id };
  // }

  // static async delete(id: string) {
  //   return await UserModel.findByIdAndDelete(id);
  // }
}
