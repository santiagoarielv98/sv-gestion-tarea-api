import { Request } from "@nestjs/common";
import { User } from "./users/interfaces/user.interface";

declare module "@nestjs/common" {
  interface Request {
    user: User;
  }
}
