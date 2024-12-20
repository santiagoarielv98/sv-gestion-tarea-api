import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTagDto } from "./dto/create-tag.dto";
import { UpdateTagDto } from "./dto/update-tag.dto";
import { PrismaService } from "../prisma.service";
import { TagNotFoundException } from "./exceptions/tag-not-found.exception";
import { TagNotDeletedException } from "./exceptions/tag-not-deleted.exception";
import { PaginationDto } from "../pagination/dto/pagination.dto";
import { paginatePrisma } from "../pagination/utils/pagination.util";
import { SortOrder } from "../pagination/enums/sort-order.enum";

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
      throw new TagNotFoundException(id);
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
      throw new TagNotDeletedException(id);
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

  async paginate(paginationDto: PaginationDto, userId: number) {
    const q = paginationDto.q;
    const order = paginationDto.order || SortOrder.DESC;
    const sort = paginationDto.sort || "createdAt";

    return paginatePrisma(
      this.prismaService.tag,
      paginationDto,
      {
        userId,
        deletedAt: null,
        OR: [{ name: { contains: q } }],
      },
      { [sort]: order },
    );
  }
}
