import { NextFunction, Request, response, Response } from "express";
import { UserSevices } from "../users";
import { AuthService } from "./authService";
import { LoginDTO, RegisterDTO } from ".";
import { validate } from "class-validator";
import { ApiError } from "../../utils";
import { StatusCodes } from "http-status-codes";
export const router = require("express").Router();

export class AuthController {
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const crudentials = new LoginDTO();
      crudentials.phoneNumber = req.body.phoneNumber;
      crudentials.password = req.body.password;
      crudentials.role = req.body.role;
      const errors = await validate(crudentials);
      console.log(errors);
      if (errors.length)
        throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid crudentials");

      if (crudentials.role === "grocer")
        res
          .status(StatusCodes.OK)
          .send(await AuthService.loginGrocer(crudentials));
      else if (crudentials.role === "deliverer")
        res
          .status(StatusCodes.OK)
          .send(await AuthService.loginGrocer(crudentials));
      else if (crudentials.role === "manager")
        res
          .status(StatusCodes.OK)
          .send(await AuthService.loginGrocer(crudentials));
      else if (crudentials.role === "admin")
        res
          .status(StatusCodes.OK)
          .send(await AuthService.loginGrocer(crudentials));
    } catch (error) {
      next(error);
    }
  }

  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const crudentials = new RegisterDTO();
      crudentials.email = req.body.email;
      crudentials.fullName = req.body.fullName;
      crudentials.phoneNumber = req.body.phoneNumber;
      crudentials.password = req.body.password;
      crudentials.role = req.body.role;
      const errors = await validate(crudentials);
      console.log(errors);
      if (errors.length)
        throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid crudentials");

      if (crudentials.role === "grocer")
        res
          .status(StatusCodes.CREATED)
          .json(await AuthService.registerGrocer(crudentials));
      else if (crudentials.role === "deliverer")
        res
          .status(StatusCodes.CREATED)
          .json(await AuthService.registerGrocer(crudentials));
      else if (crudentials.role === "manager")
        res
          .status(StatusCodes.CREATED)
          .json(await AuthService.registerGrocer(crudentials));
      else if (crudentials.role === "admin")
        res
          .status(StatusCodes.CREATED)
          .json(await AuthService.registerGrocer(crudentials));
      else next(new ApiError(StatusCodes.BAD_REQUEST, "invalid role"));
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

  // static async editPassowrd(req: Request, res: Response, next: NextFunction) {
  //   const id = req.params?.id;
  //   const password = req.body.newPassword;

  //   if (!password) {
  //     next(new ApiError(StatusCodes.BAD_REQUEST, "Password must be filled"));
  //   } else if (id && req.body.userId === id) {
  //     try {
  //       res
  //         .status(StatusCodes.ACCEPTED)
  //         .json(AuthService.editPassowrd(id, password));
  //     } catch (error) {
  //       next(error);
  //     }
  //   } else {
  //     next(new ApiError(StatusCodes.BAD_REQUEST, "wrong id"));
  //   }
  // }
}
