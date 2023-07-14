import { noteModel as NoteModel } from "./noteModel";
import { type NoteDTO } from "./dto";
import { ApiError, NoteSchema } from "../../utils";
import { Note } from "./Note";
import { StatusCodes } from "http-status-codes";
import { UpdateNoteDTO } from "./dto/updateNote.dto";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export abstract class NoteServices {
  static async create(data: NoteSchema) {
    return await prisma.note.create({ data });
  }

  static async getAll() {
    return await prisma.note.findMany();
  }

  static async getByUserId(userId: string) {
    return await prisma.note.findMany({ select: { userId } });
  }

  static async getById(id: string) {
    return await prisma.note.findUnique({ select: { id } });
  }

  static async getByTitle(title: string) {
    return await NoteModel.findOne({
      title,
    });
  }

  static async update(id: string, data: UpdateNoteDTO) {
    const service = await NoteModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!service)
      throw new ApiError(StatusCodes.BAD_REQUEST, "incorrect note id");
    return service;
  }

  static async delete(id: string) {
    const succes = NoteModel.findByIdAndDelete(id);
    if (!succes)
      throw new ApiError(StatusCodes.BAD_REQUEST, "incorrect service id");
    return succes;
  }
}
