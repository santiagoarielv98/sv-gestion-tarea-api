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
import { CreateTagDto } from "./dto/create-tag.dto";
import {
  TagPaginationResponseDto,
  TagResponseDto,
} from "./dto/tag-response.dto";
import { UpdateTagDto } from "./dto/update-tag.dto";
import { TagsService } from "./tags.service";
@Controller("tags")
@SerializeOptions({
  type: TagResponseDto,
})
@UseInterceptors(ClassSerializerInterceptor)
@ApiBearerAuth()
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({
    description: "Etiqueta creada exitosamente",
    type: TagResponseDto,
  })
  @ApiBadRequestResponse({
    description: "Error de validación",
    schema: {
      example: {
        statusCode: 400,
        message: ["name debe ser un string", "name no debe estar vacío"],
        error: "Bad Request",
      },
    },
  })
  create(@Body() createTagDto: CreateTagDto, @CurrentUser() user: User) {
    return this.tagsService.create(createTagDto, user.id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    description: "Listado de etiquetas",
    type: TagResponseDto,
    isArray: true,
  })
  findAll(@CurrentUser() user: User) {
    return this.tagsService.findAll(user.id);
  }

  @Get("all")
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(PaginationInterceptor)
  @SerializeOptions({
    type: TagPaginationResponseDto,
  })
  @ApiOkResponse({
    description: "Listado de etiquetas paginado",
    type: TagPaginationResponseDto,
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
    @CurrentUser() user: User
  ) {
    return await this.tagsService.paginate(paginationDto, user.id);
  }

  @Get(":id")
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    description: "Etiqueta encontrada",
    type: TagResponseDto,
  })
  @ApiNotFoundResponse({
    description: "Etiqueta no encontrada",
    example: {
      statusCode: 400,
      message: "Etiqueta con ID 1 no encontrada",
    },
  })
  findOne(@Param("id") id: number, @CurrentUser() user: User) {
    return this.tagsService.findOne(id, user.id);
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    description: "Etiqueta actualizada exitosamente",
    type: TagResponseDto,
  })
  @ApiNotFoundResponse({
    description: "Etiqueta no encontrada",
    example: {
      statusCode: 400,
      message: "Etiqueta con ID 1 no encontrada",
    },
  })
  @ApiBadRequestResponse({
    description: "Error de validación",
    schema: {
      example: {
        statusCode: 400,
        message: ["name debe ser un string", "name no debe estar vacío"],
        error: "Bad Request",
      },
    },
  })
  update(
    @Param("id") id: number,
    @Body() updateTagDto: UpdateTagDto,
    @CurrentUser() user: User
  ) {
    return this.tagsService.update(id, updateTagDto, user.id);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    description: "Etiqueta eliminada exitosamente",
    type: TagResponseDto,
  })
  @ApiNotFoundResponse({
    description: "Etiqueta no encontrada",
    example: {
      statusCode: 400,
      message: "Etiqueta con ID 1 no encontrada",
    },
  })
  remove(@Param("id") id: number, @CurrentUser() user: User) {
    return this.tagsService.remove(id, user.id);
  }

  @Patch(":id/restore")
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    description: "Etiqueta restaurada exitosamente",
    type: TagResponseDto,
  })
  @ApiNotFoundResponse({
    description: "Etiqueta no eliminada",
    example: {
      statusCode: 400,
      message: "Etiqueta con ID 1 no eliminada",
    },
  })
  restore(@Param("id") id: number, @CurrentUser() user: User) {
    return this.tagsService.restore(id, user.id);
  }
}
