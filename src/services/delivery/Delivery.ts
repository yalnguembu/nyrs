import { DeliverySchema } from "../../utils";

export class Delivery {
  private readonly delivery: DeliverySchema;
  constructor(private readonly data: DeliverySchema) {
    this.delivery = data;
  }

  get id() {
    return this.delivery.id;
  }

  get userId() {
    return this.delivery.userId;
  }

  get delivererId() {
    return this.delivery.delivererId;
  }

  get senderAdress() {
    return this.delivery.senderAdress ?? "";
  }

  get recipientAdress() {
    return this.delivery.recipientAdress ?? "";
  }

  get recipientPhoneNumber() {
    return this.delivery.recipientPhoneNumber ?? "";
  }

  get recipientName() {
    return this.delivery.recipientName ?? "";
  }

  get description() {
    return this.delivery.description ?? "";
  }

  get date() {
    return this.delivery.date ?? "";
  }

  get hour() {
    return this.delivery.hour;
  }

  get deliverer() {
    return this.delivery.deliverer;
  }

  get owner() {
    return this.delivery.owner;
  }

  details() {
    return this.delivery;
  }
}
