import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class DeliveryDTO {
  constructor(data: DeliveryDTO) {
    this.description = data.description ?? "";
    this.date = data.date ?? "";
    this.userId = data.userId ?? "";
    this.delivererId = data.delivererId ?? "-";
    this.status = data.status ?? "draft";
    this.senderAdress = data.senderAdress ?? "";
    this.recipientAdress = data.recipientAdress ?? "";
    this.recipientPhoneNumber = data.recipientPhoneNumber ?? "";
    this.recipientName = data.recipientName ?? "";
    this.hour = data.hour ?? "";
  }

  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsString()
  delivererId?: string;

  @IsString()
  status?: string;

  @IsNotEmpty()
  @IsString()
  senderAdress: string;

  @IsNotEmpty()
  @IsString()
  recipientAdress: string;

  @IsNotEmpty()
  @IsString()
  recipientPhoneNumber: string;

  @IsNotEmpty()
  @IsString()
  recipientName: string;

  @IsNotEmpty()
  @IsString()
  date: string;

  @IsNotEmpty()
  @IsString()
  hour: string;

  @IsString()
  description?: string;
}
