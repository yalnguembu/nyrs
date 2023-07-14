import { NextFunction, Request, response, Response } from "express";
import { UserSevices } from "../users";
import { AuthService } from "./authService";
import { AuthDTO, EditPassowrd } from ".";
import { validate } from "class-validator";
import { ApiError } from "../../utils";
import { StatusCodes } from "http-status-codes";
export const router = require("express").Router();

export class AuthController {
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const crudentials = new AuthDTO();
      crudentials.email = req.body.email;
      crudentials.password = req.body.password;
      const errors = await validate(crudentials);

      if (errors.length)
        throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid crudentials");

      res.status(StatusCodes.OK).send(await AuthService.login(crudentials));
    } catch (error) {
      next(error);
    }
  }

  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const crudentials = new AuthDTO();
      crudentials.email = req.body.email;
      crudentials.password = req.body.password;
      const errors = await validate(crudentials);
      if (errors.length)
        throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid crudentials");
      else
        res
          .status(StatusCodes.CREATED)
          .json(await AuthService.register(crudentials));
    } catch (error) {
      next(error);
    }
  }

  static async verifyToken(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.body.accessToken;

      if (!token)
        throw new ApiError(StatusCodes.BAD_REQUEST, "please provide a token");
      await AuthService.verifyToken(token);
      res.status(StatusCodes.BAD_REQUEST).json({ success: true });
    } catch (error) {
      next(error);
    }
  }

  static async editPassowrd(req: Request, res: Response, next: NextFunction) {
    const id = req.params?.id;
    const password = req.body.newPassword;

    if (!password) {
      next(new ApiError(StatusCodes.BAD_REQUEST, "Password must be filled"));
    } else if (id && req.body.userId === id) {
      try {
        res
          .status(StatusCodes.ACCEPTED)
          .json(AuthService.editPassowrd(id, password));
      } catch (error) {
        next(error);
      }
    } else {
      next(new ApiError(StatusCodes.BAD_REQUEST, "wrong id"));
    }
  }
}
