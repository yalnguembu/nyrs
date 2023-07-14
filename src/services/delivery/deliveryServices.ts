import { ApiError, DeliverySchema } from "../../utils";
import { UpdateDeliveryDTO } from "./dto/updateDelivery.dto";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export abstract class DeliveryServices {
  static async create(data: DeliverySchema) {
    return await prisma.delivery.create({
      data: {
        date: data.date ?? "",
        delivererId: data.delivererId ?? "",
        description: data.description ?? "",
        hour: data.hour ?? "",
        recipientAdress: data.recipientAdress,
        recipientName: data.recipientName,
        recipientPhoneNumber: data.recipientPhoneNumber,
        senderAdress: data.senderAdress,
        userId: data.userId,
        status: data.status ?? "",
      },
    });
  }

  static async getAll() {
    return await prisma.delivery.findMany();
  }

  static async getByUserId(userId: string) {
    return await prisma.delivery.findMany({ select: { userId: true } });
  }

  static async getByDelivererId(delivererId: string) {
    return await prisma.delivery.findMany({ select: { delivererId: true } });
  }

  static async getById(id: string) {
    return await prisma.delivery.findUnique({ where: { id } });
  }

  static async cancel(id: string) {}

  static async update(id: string, data: UpdateDeliveryDTO) {
    // const service = await DeliveryModel.findByIdAndUpdate(id, data, {
    //   new: true,
    // });
    // if (!service)
    //   throw new ApiError(StatusCodes.BAD_REQUEST, "incorrect delivery id");
    return {};
  }
}
