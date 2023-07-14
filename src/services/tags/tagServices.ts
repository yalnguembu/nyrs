import { TagModel } from "./tagModel";
import { type TagDTO } from "./dto";
import { ApiError, TagSchema } from "../../utils";
import { Tag } from "./Tag";
import { StatusCodes } from "http-status-codes";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export abstract class TagServices {
  static async create(data: TagSchema) {
    const tag = await prisma.tag.create({
      data: data,
    });
    return new Tag(tag).details();
  }

  static async getAll() {
    return await prisma.tag.findMany();
  }

  static async getOne(id: string) {
    return await prisma.tag.findUnique({ where: { id } });
  }

  static async getByTile(title: string) {
    return await prisma.tag.findFirst({ where: { title } });
  }

  static async update(id: string, data: TagDTO) {
    const tag = TagModel.findByIdAndUpdate(id, data);
    if (!tag) throw new ApiError(StatusCodes.BAD_REQUEST, "Wrong tag id");
    return tag;
  }

  static async delete(id: string) {
    const succes = TagModel.findByIdAndDelete(id);
    if (!succes) throw new ApiError(StatusCodes.BAD_REQUEST, "wrong tag");
    return succes;
  }
}
