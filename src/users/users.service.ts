import { ConflictException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async findOne(email: string) {
    return this.prismaService.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  async create(createUserDto: CreateUserDto) {
    const user = await this.findOne(createUserDto.email);

    if (user) {
      throw new ConflictException("El correo electrónico ya está en uso.");
    }

    return this.prismaService.user.create({
      data: createUserDto,
    });
  }
}
