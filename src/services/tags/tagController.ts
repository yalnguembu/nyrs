import { validate } from "class-validator";
import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "../../utils";
import { TagServices } from "./tagServices";
import { TagDTO } from "./dto";

export class TagController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const tag = new TagDTO(req.body);
      const errors = await validate(tag);

      if (errors.length) throw new ApiError(StatusCodes.CREATED, "bad request");
      const oldTag = await TagServices.getByTile(tag.title);

      if (oldTag) throw new ApiError(StatusCodes.CONFLICT, "Existing tag");

      res.status(StatusCodes.OK).json(await TagServices.create(tag));
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(StatusCodes.OK).json(await TagServices.getAll());
    } catch (err) {
      next(err);
    }
  }

  static async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(StatusCodes.OK).json(await TagServices.getOne(req.params.id));
    } catch (err) {
      next(err);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const tag = new TagDTO(req.body);

      const errors = await validate(tag);

      if (!id)
        new ApiError(StatusCodes.BAD_REQUEST, "category id must be provided");

      const oldTag = await TagServices.getByTile(tag.title);

      if (oldTag && oldTag.description == tag.description)
        throw new ApiError(StatusCodes.BAD_REQUEST, "Nothing to update");

      if (errors.length)
        throw new ApiError(StatusCodes.BAD_REQUEST, "wrong informations");

      res.status(StatusCodes.OK).json(await TagServices.update(id, tag));
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
          "category id must be provided"
        );
      if (await TagServices.delete(id))
        res.status(StatusCodes.BAD_REQUEST).json({ success: true });
    } catch (error) {
      next(error);
    }
  }
}
