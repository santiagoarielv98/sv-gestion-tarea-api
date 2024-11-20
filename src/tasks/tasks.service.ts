import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { PrismaService } from "../prisma.service";

@Injectable()
export class TasksService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createTaskDto: CreateTaskDto, userId: number) {
    return this.prismaService.task.create({
      data: { ...createTaskDto, userId },
    });
  }

  findAll() {
    return this.prismaService.task.findMany({
      where: { deletedAt: null },
    });
  }

  async findOne(id: number) {
    const task = await this.prismaService.task.findFirst({
      where: { id, deletedAt: null },
    });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const task = await this.findOne(id);
    return this.prismaService.task.update({
      where: { id },
      data: { ...task, ...updateTaskDto },
    });
  }

  async remove(id: number) {
    const task = await this.findOne(id);
    return this.prismaService.task.update({
      where: { id },
      data: { ...task, deletedAt: new Date() },
    });
  }
}
