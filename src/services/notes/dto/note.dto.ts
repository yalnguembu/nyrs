import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class NoteDTO {
  constructor(data: NoteDTO) {
    this.title = data.title ?? "";
    this.ownerId = data.ownerId ?? "";
    this.description = data.description ?? "";
    this.creationDate = data.creationDate ?? "";
    this.tags = data.tags ?? [];
  }

  @IsNotEmpty()
  @IsString()
  ownerId!: string;

  @IsNotEmpty()
  @IsString()
  title!: string;

  @IsArray()
  tags?: string[];

  @IsString()
  description?: string;

  @IsString()
  creationDate?: string;
}
