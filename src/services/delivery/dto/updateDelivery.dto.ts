import { IsNotEmpty, IsString } from "class-validator";

export class UpdateDeliveryDTO {
  @IsNotEmpty()
  @IsString()
  title!: string;

  @IsString()
  @IsNotEmpty()
  tags!: string[];

  @IsString()
  desciption?: string;
}
