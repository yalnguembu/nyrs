import { validate } from "class-validator";
import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "../../utils";
import { DeliveryServices } from "./deliveryServices";
import { DeliveryDTO } from "./dto";
import { UserSevices } from "../users";
import { UpdateDeliveryDTO } from "./dto";
import { type ValidationError } from "class-validator";
import { DelivererServices } from "../deliverer";

export class DeliveryController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const newDelivery = new DeliveryDTO(req.body);
      const errors = await validate(newDelivery);

      if (errors.length)
        throw new ApiError(
          StatusCodes.BAD_REQUEST,
          errors
            .map(
              (error: ValidationError) => `${error.property}: ${error.value}`
            )
            .toString()
        );

      let delivery = await DeliveryServices.create(newDelivery);
      const deliverer = await DelivererServices.getShuffle();

      delivery = await DeliveryServices.assignToDeliverer(
        delivery.id,
        deliverer?.id ?? "-"
      );

      res.status(StatusCodes.OK).json(delivery);
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
    const userId = req.params.id;
    try {
      res
        .status(StatusCodes.OK)
        .json(await DeliveryServices.getByUserId(userId as unknown as string));
    } catch (error) {
      next(error);
    }
  }

  static async getByDeliverer(req: Request, res: Response, next: NextFunction) {
    const delivererId = req.params.id;
    try {
      res
        .status(StatusCodes.OK)
        .json(
          await DeliveryServices.getByUserId(delivererId as unknown as string)
        );
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

  static async pickUp(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id ?? "";

      if (!id)
        new ApiError(StatusCodes.BAD_REQUEST, "service id must be provided");

      res.status(StatusCodes.OK).json(await DeliveryServices.pickUp(id));
    } catch (error) {
      next(error);
    }
  }

  static async moving(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id ?? "";

      if (!id)
        new ApiError(StatusCodes.BAD_REQUEST, "service id must be provided");

      res.status(StatusCodes.OK).json(await DeliveryServices.moving(id));
    } catch (error) {
      next(error);
    }
  }

  static async done(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id ?? "";

      if (!id)
        new ApiError(StatusCodes.BAD_REQUEST, "service id must be provided");

      res.status(StatusCodes.OK).json(await DeliveryServices.done(id));
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
      res.status(StatusCodes.OK).json(await DeliveryServices.cancel(id));
    } catch (error) {
      next(error);
    }
  }
}
