import { IsNotEmpty, IsEmail } from "class-validator";

export class UpdateUserDTO {
  @IsNotEmpty()
  fullName?: string;

  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  picture!: string;
}
