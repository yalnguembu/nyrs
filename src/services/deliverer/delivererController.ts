import { validate } from "class-validator";
import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "../../utils";
import { DelivererServices } from "./delivererServices";
import { DelivererDTO } from "./dto";
import { UserSevices } from "../users";
import { type ValidationError } from "class-validator";

export class DelivererController {

  static async getAll(req: Request, res: Response, next: NextFunction) {
    const userId = req.query["user-id"];
    try {
      res.status(StatusCodes.OK).json(await DelivererServices.getAll());
    } catch (error) {
      next(error);
    }
  }
}
