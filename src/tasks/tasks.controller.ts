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
  ClassSerializerInterceptor,
  UseInterceptors,
  SerializeOptions,
  Query,
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import {
  TaskPaginationResponseDto,
  TaskResponseDto,
} from "./dto/task-response.dto";
import { plainToInstance } from "class-transformer";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CurrentUser } from "../auth/current-user.decorator";
import { User } from "../users/interfaces/user.interface";
import { PaginationDto } from "../pagination/dto/pagination.dto";
import { PaginationInterceptor } from "../pagination/pagination.interceptor";

@Controller("tasks")
@SerializeOptions({
  type: TaskResponseDto,
})
@UseInterceptors(ClassSerializerInterceptor)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createTaskDto: CreateTaskDto,
    @CurrentUser() user: User
  ): Promise<TaskResponseDto> {
    return await this.tasksService.create(createTaskDto, user.id);
  }

  @Get("all")
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(PaginationInterceptor)
  @SerializeOptions({
    type: TaskPaginationResponseDto,
  })
  async getAll(
    @Query() paginationDto: PaginationDto,
    @CurrentUser() user: User
  ) {
    return await this.tasksService.paginate(paginationDto, user.id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@CurrentUser() user: User): Promise<TaskResponseDto[]> {
    return await this.tasksService.findAll(user.id);
  }

  @Get(":id")
  @UseGuards(JwtAuthGuard)
  async findOne(
    @Param("id") id: number,
    @CurrentUser() user: User
  ): Promise<TaskResponseDto> {
    return await this.tasksService.findOne(id, user.id);
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard)
  async update(
    @Param("id") id: number,
    @Body() updateTaskDto: UpdateTaskDto,
    @CurrentUser() user: User
  ): Promise<TaskResponseDto> {
    return await this.tasksService.update(id, updateTaskDto, user.id);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  async remove(
    @Param("id") id: number,
    @CurrentUser() user: User
  ): Promise<TaskResponseDto> {
    return await this.tasksService.remove(id, user.id);
  }

  @Patch(":id/restore")
  @UseGuards(JwtAuthGuard)
  async restore(
    @Param("id") id: number,
    @CurrentUser() user: User
  ): Promise<TaskResponseDto> {
    return await this.tasksService.restore(id, user.id);
  }
}
