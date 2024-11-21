import { Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/users/interfaces/user.interface";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  async validateUser(email: string, pass: string): Promise<User> {
    const user = await this.usersService.findOne(email);

    const match = await bcrypt.compare(pass, user.password);

    if (user && match) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user.id, name: user.name };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(
      user.password,
      parseInt(this.configService.get("SALT_ROUNDS"))
    );

    const newUser = await this.usersService.create({
      ...user,
      password: hashedPassword,
    });

    return this.login(newUser);
    // return newUser;
  }
}
