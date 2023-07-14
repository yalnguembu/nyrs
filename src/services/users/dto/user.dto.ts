import { IsNotEmpty, IsEmail } from "class-validator";

export class UserDTO {
  @IsNotEmpty()
  id!: string;

  @IsNotEmpty()
  fullName?: string;

  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  picture!: string;

  @IsNotEmpty()
  role!: string;
}
