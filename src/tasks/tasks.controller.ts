import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  SerializeOptions,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
} from "@nestjs/swagger";
import { SortOrder } from "../pagination/enums/sort-order.enum";
import { CurrentUser } from "../auth/current-user.decorator";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { PaginationDto } from "../pagination/dto/pagination.dto";
import { PaginationInterceptor } from "../pagination/pagination.interceptor";
import { User } from "../users/interfaces/user.interface";
import { CreateTaskDto } from "./dto/create-task.dto";
import {
  TaskPaginationResponseDto,
  TaskResponseDto,
} from "./dto/task-response.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { TasksService } from "./tasks.service";

@Controller("tasks")
@SerializeOptions({
  type: TaskResponseDto,
})
@UseInterceptors(ClassSerializerInterceptor)
@ApiBearerAuth()
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({
    description: "Tarea creada exitosamente",
    type: TaskResponseDto,
  })
  @ApiBadRequestResponse({
    description: "Error de validación",
    schema: {
      example: {
        statusCode: 400,
        message: ["title debe ser un string", "title no debe estar vacío"],
        error: "Bad Request",
      },
    },
  })
  async create(
    @Body() createTaskDto: CreateTaskDto,
    @CurrentUser() user: User,
  ): Promise<TaskResponseDto> {
    return await this.tasksService.create(createTaskDto, user.id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    description: "Listado de tareas",
    type: TaskResponseDto,
    isArray: true,
  })
  async findAll(@CurrentUser() user: User): Promise<TaskResponseDto[]> {
    return await this.tasksService.findAll(user.id);
  }

  @Get("all")
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(PaginationInterceptor)
  @SerializeOptions({
    type: TaskPaginationResponseDto,
  })
  @ApiOkResponse({
    description: "Listado de tareas paginado",
    type: TaskPaginationResponseDto,
  })
  @ApiBadRequestResponse({
    description: "Campo inválido para ordenar",
    schema: {
      example: {
        statusCode: 400,
        message: "Campo inválido para ordenar: invalidField",
      },
    },
  })
  @ApiQuery({
    name: "page",
    required: false,
    type: Number,
    description: "Número de página",
    default: 1,
  })
  @ApiQuery({
    name: "limit",
    required: false,
    type: Number,
    description: "Número de elementos por página",
    default: 10,
  })
  @ApiQuery({
    name: "order",
    required: false,
    description: "Ordenar de forma ascendente (ASC) o descendente (DESC)",
    enum: SortOrder,
    default: SortOrder.DESC,
  })
  @ApiQuery({
    name: "sort",
    required: false,
    type: String,
    description: "Campo por el cual ordenar",
    default: "createdAt",
  })
  async getAll(
    @Query() paginationDto: PaginationDto,
    @CurrentUser() user: User,
  ) {
    return await this.tasksService.paginate(paginationDto, user.id);
  }

  @Get(":id")
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    description: "Tarea encontrada",
    type: TaskResponseDto,
  })
  @ApiNotFoundResponse({
    description: "Tarea no encontrada",
    example: {
      statusCode: 404,
      message: "Tarea con ID 1 no encontrada",
    },
  })
  async findOne(
    @Param("id") id: number,
    @CurrentUser() user: User,
  ): Promise<TaskResponseDto> {
    return await this.tasksService.findOne(id, user.id);
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    description: "Tarea actualizada exitosamente",
    type: TaskResponseDto,
  })
  @ApiNotFoundResponse({
    description: "Tarea no encontrada",
    example: {
      statusCode: 404,
      message: "Tarea con ID 1 no encontrada",
    },
  })
  @ApiBadRequestResponse({
    description: "Error de validación",
    schema: {
      example: {
        statusCode: 400,
        message: ["title debe ser un string", "title no debe estar vacío"],
        error: "Bad Request",
      },
    },
  })
  async update(
    @Param("id") id: number,
    @Body() updateTaskDto: UpdateTaskDto,
    @CurrentUser() user: User,
  ): Promise<TaskResponseDto> {
    return await this.tasksService.update(id, updateTaskDto, user.id);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    description: "Tarea eliminada exitosamente",
    type: TaskResponseDto,
  })
  @ApiNotFoundResponse({
    description: "Tarea no encontrada",
    example: {
      statusCode: 404,
      message: "Tarea con ID 1 no encontrada",
    },
  })
  async remove(
    @Param("id") id: number,
    @CurrentUser() user: User,
  ): Promise<TaskResponseDto> {
    return await this.tasksService.remove(id, user.id);
  }

  @Patch(":id/restore")
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    description: "Tarea restaurada exitosamente",
    type: TaskResponseDto,
  })
  @ApiNotFoundResponse({
    description: "Tarea no eliminada",
    example: {
      statusCode: 404,
      message: "Tarea con ID 1 no eliminada",
    },
  })
  async restore(
    @Param("id") id: number,
    @CurrentUser() user: User,
  ): Promise<TaskResponseDto> {
    return await this.tasksService.restore(id, user.id);
  }

  @Patch(":id/toggle")
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    description: "Estado de la tarea cambiado exitosamente",
    type: TaskResponseDto,
  })
  @ApiNotFoundResponse({
    description: "Tarea no encontrada",
    example: {
      statusCode: 404,
      message: "Tarea con ID 1 no encontrada",
    },
  })
  async toggle(
    @Param("id") id: number,
    @CurrentUser() user: User,
  ): Promise<TaskResponseDto> {
    return await this.tasksService.toggle(id, user.id);
  }
}
