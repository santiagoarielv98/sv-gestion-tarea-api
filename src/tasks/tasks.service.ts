import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { PrismaService } from "../prisma.service";

@Injectable()
export class TasksService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createTaskDto: CreateTaskDto, userId: number) {
    return this.prismaService.task.create({
      data: { ...createTaskDto, userId },
    });
  }

  async findAll(userId: number) {
    return this.prismaService.task.findMany({
      where: { deletedAt: null, userId },
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

  async update(id: number, updateTaskDto: UpdateTaskDto, userId: number) {
    const task = await this.findOne(id, userId);
    return this.prismaService.task.update({
      where: { id, userId },
      data: { ...task, ...updateTaskDto },
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
