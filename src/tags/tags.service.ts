import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTagDto } from "./dto/create-tag.dto";
import { UpdateTagDto } from "./dto/update-tag.dto";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class TagsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createTagDto: CreateTagDto, userId: number) {
    return this.prismaService.tag.create({
      data: { ...createTagDto, userId },
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
    const tag = await this.prismaService.tag.findUnique({
      where: { id, userId, deletedAt: null },
    });

    if (!tag) {
      throw new NotFoundException(`Tag with ID ${id} not found`);
    }

    return tag;
  }

  async update(id: number, updateTagDto: UpdateTagDto, userId: number) {
    await this.findOne(id, userId);

    return this.prismaService.tag.update({
      where: { id, userId },
      data: updateTagDto,
    });
  }

  async remove(id: number, userId: number) {
    await this.findOne(id, userId);

    return this.prismaService.tag.delete({
      where: { id },
    });
  }

  async restore(id: number, userId: number) {
    const tag = await this.prismaService.tag.findFirst({
      where: { id, deletedAt: { not: null }, userId },
    });

    if (!tag) {
      throw new NotFoundException(`Tag with ID ${id} not found`);
    }

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
