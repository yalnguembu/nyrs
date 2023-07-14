import { IsNotEmpty, IsString } from "class-validator";

export class UpdateNoteDTO {
  @IsNotEmpty()
  @IsString()
  title!: string;

  @IsString()
  @IsNotEmpty()
  tags!: string[];

  @IsString()
  desciption?: string;
}
