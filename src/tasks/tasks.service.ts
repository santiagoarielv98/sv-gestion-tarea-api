import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { PrismaService } from "../prisma.service";
import { TagsService } from "src/tags/tags.service";

@Injectable()
export class TasksService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly tagsService: TagsService
  ) {}

  async create({ tags = [], ...createTaskDto }: CreateTaskDto, userId: number) {
    const existingTags = await this.tagsService.findTagsByIds(tags, userId);

    if (tags.length !== existingTags.length) {
      throw new NotFoundException("Some tags not found");
    }

    return this.prismaService.task.create({
      data: {
        ...createTaskDto,
        userId,
        tags: { connect: existingTags.map((tag) => ({ id: tag.id })) },
      },
      include: { tags: true },
    });
  }

  async findAll(userId: number) {
    return this.prismaService.task.findMany({
      where: { deletedAt: null, userId },
      orderBy: { createdAt: "desc" },
      include: { tags: true },
    });
  }

  async findOne(id: number, userId: number) {
    const task = await this.prismaService.task.findFirst({
      where: { id, deletedAt: null, userId },
      include: { tags: true },
    });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  async update(
    id: number,
    { tags = [], ...updateTaskDto }: UpdateTaskDto,
    userId: number
  ) {
    const existingTags = await this.tagsService.findTagsByIds(tags, userId);

    if (tags.length !== existingTags.length) {
      throw new NotFoundException("Some tags not found");
    }

    await this.findOne(id, userId);

    return this.prismaService.task.update({
      where: { id, userId },
      data: { ...updateTaskDto, tags: { set: existingTags } },
      include: { tags: true },
    });
  }

  async remove(id: number, userId: number) {
    const { tags, ...task } = await this.findOne(id, userId);
    return this.prismaService.task.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async restore(id: number, userId: number) {
    const task = await this.prismaService.task.findFirst({
      where: { id, userId, deletedAt: { not: null } },
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return this.prismaService.task.update({
      where: { id },
      data: { deletedAt: null },
    });
  }
}
