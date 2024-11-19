import { Injectable } from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class TasksService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createTaskDto: CreateTaskDto) {
    return this.prismaService.task.create({
      data: createTaskDto,
    });
  }

  findAll() {
    return this.prismaService.task.findMany({
      where: { deletedAt: null },
    });
  }

  findOne(id: number) {
    return this.prismaService.task.findFirst({
      where: { id, deletedAt: null },
    });
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return this.prismaService.task.update({
      where: { id, deletedAt: null },
      data: updateTaskDto,
    });
  }

  remove(id: number) {
    return this.prismaService.task.update({
      where: { id, deletedAt: null },
      data: { deletedAt: new Date() },
    });
  }
}
