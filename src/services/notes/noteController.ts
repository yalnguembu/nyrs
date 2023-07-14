import { validate } from "class-validator";
import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "../../utils";
import { NoteServices } from "./noteServices";
import { NoteDTO } from "./dto";
import { UserSevices } from "../users";
import { UpdateNoteDTO } from "./dto/updateNote.dto";
import { type ValidationError } from "class-validator";

export class NoteController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const note = new NoteDTO(req.body);
      const errors = await validate(note);

      if (errors.length)
        throw new ApiError(
          StatusCodes.BAD_REQUEST,
          errors
            .map(
              (error: ValidationError) => `${error.property}: ${error.value}`
            )
            .toString()
        );

      if (await NoteServices.getByTitle(note.title))
        throw new ApiError(
          StatusCodes.CONFLICT,
          "A note already exist with this title"
        );

      res.status(StatusCodes.OK).json(await NoteServices.create(note));
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req: Request, res: Response, next: NextFunction) {
    const userId = req.query["user-id"];
    try {
      if (userId) {
        res
          .status(StatusCodes.OK)
          .json(await NoteServices.getByUserId(userId as unknown as string));
      } else {
        res.status(StatusCodes.OK).json(await NoteServices.getAll());
      }
    } catch (error) {
      next(error);
    }
  }

  static async getArchived(req: Request, res: Response, next: NextFunction) {
    const userId = req.query["user-id"];
    try {
      if (userId) {
        res
          .status(StatusCodes.OK)
          .json(
            await NoteServices.getArchivedByUserId(userId as unknown as string)
          );
      } else {
        res.status(StatusCodes.OK).json(await NoteServices.getArchived());
      }
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id ?? "";

      if (!id)
        new ApiError(StatusCodes.BAD_REQUEST, "service id must be provided");

      res.status(StatusCodes.OK).json(await NoteServices.getById(id));
    } catch (error) {
      next(error);
    }
  }

  static async getByUserId(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.query.id ?? "";

      if (!userId)
        new ApiError(StatusCodes.BAD_REQUEST, "service id must be provided");

      const user = await UserSevices.getById(userId as unknown as string);

      if (!user) new ApiError(StatusCodes.BAD_REQUEST, "wrong user id");

      res
        .status(StatusCodes.OK)
        .json(await NoteServices.getByUserId(userId as unknown as string));
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id ?? "";
      if (!id)
        new ApiError(StatusCodes.BAD_REQUEST, "service id must be provided");

      const note = new UpdateNoteDTO();
      note.title = req.body.service ?? "";
      note.desciption = req.body.date ?? "";
      note.tags = req.body.tags ?? "";
      const errors = await validate(note);

      if (errors.length)
        throw new ApiError(StatusCodes.BAD_REQUEST, "wrong informations");
      res.status(StatusCodes.OK).json(await NoteServices.update(id, note));
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;

      if (!id)
        throw new ApiError(
          StatusCodes.BAD_REQUEST,
          "service id must be provided"
        );
      res.status(StatusCodes.OK).json(await NoteServices.cancel(id));
    } catch (error) {
      next(error);
    }
  }

  static async cancel(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;

      if (!id)
        throw new ApiError(
          StatusCodes.BAD_REQUEST,
          "service id must be provided"
        );
      res.status(StatusCodes.OK).json(await NoteServices.cancel(id));
    } catch (error) {
      next(error);
    }
  }
}
