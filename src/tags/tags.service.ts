import { Injectable } from "@nestjs/common";
import { CreateTagDto } from "./dto/create-tag.dto";
import { UpdateTagDto } from "./dto/update-tag.dto";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class TagsService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createTagDto: CreateTagDto, userId: number) {
    return this.prismaService.tag.create({
      data: { ...createTagDto, userId },
    });
  }

  findAll(userId: number) {
    return this.prismaService.tag.findMany({
      where: {
        userId,
        deletedAt: null,
      },
    });
  }

  async findOne(id: number, userId: number) {
    return this.prismaService.tag.findUnique({
      where: {
        id,
        userId,
        deletedAt: null,
      },
    });
  }

  update(id: number, updateTagDto: UpdateTagDto, userId: number) {
    return this.prismaService.tag.update({
      where: { id, userId, deletedAt: null },
      data: updateTagDto,
    });
  }

  remove(id: number, userId: number) {
    return this.prismaService.tag.update({
      where: { id, userId, deletedAt: null },
      data: { deletedAt: new Date() },
    });
  }

  restore(id: number, userId: number) {
    return this.prismaService.tag.update({
      where: { id, deletedAt: { not: null } },
      data: { deletedAt: null },
    });
  }
}
