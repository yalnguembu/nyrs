import { IsEmail, IsNotEmpty, Length, IsString } from "class-validator";
import { User } from "../../users/User";

export class RegisterDTO
  implements Pick<User, "email" | "password" | "role" | "fullName">
{
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email!: string;

  @IsNotEmpty()
  @IsString()
  phoneNumber!: string;

  @IsNotEmpty()
  @Length(8)
  @IsString()
  password!: string;

  @IsNotEmpty()
  @IsString()
  role!: string;

  @IsNotEmpty()
  @IsString()
  fullName!: string;
}

export class LoginDTO
  implements Pick<User, "phoneNumber" | "password" | "role">
{
  @IsNotEmpty()
  @IsString()
  phoneNumber!: string;

  @IsNotEmpty()
  @Length(8)
  @IsString()
  password!: string;

  @IsNotEmpty()
  @IsString()
  role!: string;
}
