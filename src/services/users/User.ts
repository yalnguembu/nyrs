import { UserSchema } from "../../utils";

export class User {
  private readonly user: UserSchema;
  constructor(data: UserSchema) {
    this.user = data;
  }

  get id() {
    return this.user.id ?? "";
  }

  get email() {
    return this.user.email ?? "";
  }

  get phoneNumber() {
    return this.user.phoneNumber ?? "";
  }

  get password() {
    return this.user.password ?? "";
  }

  get fullName() {
    return this.user.fullName ?? "";
  }

  get picture() {
    return this.user.picture ?? "";
  }

  get role() {
    return this.user.role ?? "";
  }

  details = () => {
    return {
      id: this.id,
      email: this.email,
      fullName: this.fullName,
      picture: this.picture,
      role: this.role,
    };
  };
}
