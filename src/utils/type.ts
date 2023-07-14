export interface Error {
  name: string;
  message: string;
  stack?: string;
}

export type DecodedToken = {
  id: string;
  email: string;
  role: string;
};

export type UserSchema = {
  id?: string;
  password?: string;
  email: string;
  role?: string;
  fullName?: string;
  phoneNumber?: string;
  picture?: string;
  createdAt?: string;
  updatedAt?: string;
};
export type TagSchema = {
  id?: string;
  title?: string;
  description?: string;
};

export type DeliverySchema = {
  id?: string;
  userId: string;
  owner?: Object | undefined;
  deliverer?: Object;
  delivererId?: string;
  senderAdress: string;
  recipientAdress: string;
  recipientPhoneNumber: string;
  recipientName: string;
  description?: string;
  date?: string;
  hour?: string;
  status?: string;
};
