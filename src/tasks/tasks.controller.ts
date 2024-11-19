import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { TaskResponseDto } from "./dto/task-response.dto";
import { plainToInstance } from "class-transformer";

@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto): Promise<TaskResponseDto> {
    const createdTask = await this.tasksService.create(createTaskDto);
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
  async update(
    @Param("id") id: string,
    @Body() updateTaskDto: UpdateTaskDto
  ): Promise<TaskResponseDto> {
    const updatedTask = await this.tasksService.update(+id, updateTaskDto);
    return plainToInstance(TaskResponseDto, updatedTask);
  }

  @Delete(":id")
  async remove(@Param("id") id: string): Promise<TaskResponseDto> {
    const deletedTask = await this.tasksService.remove(+id);
    return plainToInstance(TaskResponseDto, deletedTask);
  }
}
