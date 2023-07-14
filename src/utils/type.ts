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
  username?: string;
  picture?: string;
  createdAt?: string;
  updatedAt?: string;
};
export type TagSchema = {
  id?: string;
  title?: string;
  description?: string;
};

export type NoteSchema = {
  id?: string;
  ownerId: string;
  title: string;
  description?: string;
  creationDate?: string;
  tags?: string[];
};
