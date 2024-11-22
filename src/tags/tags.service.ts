import { Injectable } from "@nestjs/common";
import { CreateTagDto } from "./dto/create-tag.dto";
import { UpdateTagDto } from "./dto/update-tag.dto";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class TagsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createTagDto: CreateTagDto, userId: number) {
    return this.prismaService.tag.create({
      data: { ...createTagDto, userId },
      include: { tasks: true },
    });
  }

  async findAll(userId: number) {
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

  async update(id: number, updateTagDto: UpdateTagDto, userId: number) {
    return this.prismaService.tag.update({
      where: { id, userId, deletedAt: null },
      data: updateTagDto,
    });
  }

  async remove(id: number, userId: number) {
    return this.prismaService.tag.update({
      where: { id, userId, deletedAt: null },
      data: { deletedAt: new Date() },
    });
  }

  async restore(id: number, userId: number) {
    return this.prismaService.tag.update({
      where: { id, deletedAt: { not: null }, userId },
      data: { deletedAt: null },
    });
  }

  async findTagsByIds(ids: number[], userId: number) {
    return this.prismaService.tag.findMany({
      where: { id: { in: ids }, userId, deletedAt: null },
    });
  }
}
