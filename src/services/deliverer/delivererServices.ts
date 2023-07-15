import { ApiError } from "../../utils";
import { PrismaClient } from "@prisma/client";
import { Delivery } from "./Deliverer";

const prisma = new PrismaClient();

export abstract class DelivererServices {
  static async getAll() {
    return await prisma.delivery.findMany();
  }

  static async getById(id: string) {
    return await prisma.delivery.findUnique({ where: { id } });
  }

  static async getShuffle() {
    return await prisma.delivery.findFirst();
  }

  static async cancel(id: string): Promise<boolean> {
    return false;
  }

  // static async update(id: string, data) {
  //   // const service = await DelivererModel.findByIdAndUpdate(id, data, {
  //   //   new: true,
  //   // });
  //   // if (!service)
  //   //   throw new ApiError(StatusCodes.BAD_REQUEST, "incorrect delivery id");
  //   return {};
  // }
}
