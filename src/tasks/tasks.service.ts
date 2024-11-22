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
    });
  }

  async findOne(id: number, userId: number) {
    const task = await this.prismaService.task.findFirst({
      where: { id, deletedAt: null, userId },
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

    const task = await this.findOne(id, userId);

    return this.prismaService.task.update({
      where: { id, userId },
      data: { ...task, ...updateTaskDto, tags: { set: existingTags } },
    });
  }

  async remove(id: number, userId: number) {
    const task = await this.findOne(id, userId);
    return this.prismaService.task.update({
      where: { id },
      data: { ...task, deletedAt: new Date() },
    });
  }

  async restore(id: number, userId: number) {
    const task = await this.prismaService.task.findFirst({
      where: { id, userId, deletedAt: { not: null } },
    });

    return this.prismaService.task.update({
      where: { id },
      data: { ...task, deletedAt: null },
    });
  }
}
