import { validate } from "class-validator";
import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "../../utils";
import { DeliveryServices } from "./deliveryServices";
import { DeliveryDTO } from "./dto";
import { UserSevices } from "../users";
import { UpdateDeliveryDTO } from "./dto";
import { type ValidationError } from "class-validator";

export class DeliveryController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const delivery = new DeliveryDTO(req.body);
      const errors = await validate(delivery);

      if (errors.length)
        throw new ApiError(
          StatusCodes.BAD_REQUEST,
          errors
            .map(
              (error: ValidationError) => `${error.property}: ${error.value}`
            )
            .toString()
        );

      res.status(StatusCodes.OK).json(await DeliveryServices.create(delivery));
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req: Request, res: Response, next: NextFunction) {
    const userId = req.query["user-id"];
    try {
      res.status(StatusCodes.OK).json(await DeliveryServices.getAll());
    } catch (error) {
      next(error);
    }
  }

  static async getByGrocer(req: Request, res: Response, next: NextFunction) {
    const userId = req.params.id
    try {
      res
        .status(StatusCodes.OK)
        .json(await DeliveryServices.getByUserId(userId as unknown as string));
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id ?? "";

      if (!id)
        new ApiError(StatusCodes.BAD_REQUEST, "service id must be provided");

      res.status(StatusCodes.OK).json(await DeliveryServices.getById(id));
    } catch (error) {
      next(error);
    }
  }

  // static async getByUserId(req: Request, res: Response, next: NextFunction) {
  // try {
  //   const userId = req.query.id ?? "";

  //   if (!userId)
  //     new ApiError(StatusCodes.BAD_REQUEST, "service id must be provided");

  //   const user = await UserSevices.getById(userId as unknown as string);

  //   if (!user) new ApiError(StatusCodes.BAD_REQUEST, "wrong user id");

  //   res
  //     .status(StatusCodes.OK)
  //     .json(await DeliveryServices.getByUserId(userId as unknown as string));
  // } catch (error) {
  //   next(error);
  // }
  // }

  // static async update(req: Request, res: Response, next: NextFunction) {
  // try {
  //   const id = req.params.id ?? "";
  //   if (!id)
  //     new ApiError(StatusCodes.BAD_REQUEST, "service id must be provided");

  //   const delivery = new UpdateDeliveryDTO();
  //   delivery.title = req.body.service ?? "";
  //   delivery.desciption = req.body.date ?? "";
  //   delivery.tags = req.body.tags ?? "";
  //   const errors = await validate(delivery);

  //   if (errors.length)
  //     throw new ApiError(StatusCodes.BAD_REQUEST, "wrong informations");
  //   res
  //     .status(StatusCodes.OK)
  //     .json(await DeliveryServices.update(id, delivery));
  // } catch (error) {
  //   next(error);
  // }
  // }

  static async cancel(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;

      if (!id)
        throw new ApiError(
          StatusCodes.BAD_REQUEST,
          "service id must be provided"
        );
      res.status(StatusCodes.OK).json(await DeliveryServices.cancel(id));
    } catch (error) {
      next(error);
    }
  }
}
