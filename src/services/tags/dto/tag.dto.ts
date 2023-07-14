import { IsNotEmpty, IsString } from "class-validator";

export class TagDTO {
  constructor(data: TagDTO) {
    this.title = data.title ?? "";
    this.ownerId = data.ownerId ?? "";
    this.description = data.description ?? "";
  }

  @IsNotEmpty()
  @IsString()
  title!: string;

  @IsString()
  ownerId!: string;

  @IsString()
  description?: string;
}
