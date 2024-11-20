import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { TaskResponseDto } from "./dto/task-response.dto";
import { plainToInstance } from "class-transformer";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { CurrentUser } from "src/auth/current-user.decorator";
import { User } from "src/users/interfaces/user.interface";

@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createTaskDto: CreateTaskDto,
    @CurrentUser() user: User
  ): Promise<TaskResponseDto> {
    const createdTask = await this.tasksService.create(createTaskDto, user.id);
    return plainToInstance(TaskResponseDto, createdTask);
  }

  @Get()
  async findAll(): Promise<TaskResponseDto[]> {
    const tasks = await this.tasksService.findAll();
    return plainToInstance(TaskResponseDto, tasks);
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<TaskResponseDto> {
    const task = await this.tasksService.findOne(+id);
    return plainToInstance(TaskResponseDto, task);
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard)
  async update(
    @Param("id") id: string,
    @Body() updateTaskDto: UpdateTaskDto
  ): Promise<TaskResponseDto> {
    const updatedTask = await this.tasksService.update(+id, updateTaskDto);
    return plainToInstance(TaskResponseDto, updatedTask);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  async remove(@Param("id") id: string): Promise<TaskResponseDto> {
    const deletedTask = await this.tasksService.remove(+id);
    return plainToInstance(TaskResponseDto, deletedTask);
  }
}
