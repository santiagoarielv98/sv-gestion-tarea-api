import { Exclude, Expose, Type } from "class-transformer";
import { TagResponseDto } from "../../tags/dto/tag-response.dto";
import { ApiProperty } from "@nestjs/swagger";
import { MetaDto } from "src/pagination/dto/meta.dto";

export class TaskResponseDto {
  @Expose()
  @ApiProperty({
    description: "Identificador de la tarea",
    example: 1,
    default: 1,
  })
  id: number;

  @Expose()
  @ApiProperty({
    description: "Título de la tarea",
    example: "Comprar leche",
    default: "Comprar leche",
  })
  title: string;

  @Expose()
  @ApiProperty({
    description: "Contenido de la tarea",
    example: "Leche descremada",
    default: "Leche descremada",
    required: false,
  })
  content?: string;

  @Expose()
  @Type(() => TagResponseDto)
  @ApiProperty({
    description: "Lista de etiquetas",
    type: TagResponseDto,
    required: false,
  })
  tags?: TagResponseDto[];

  @Exclude()
  createdAt?: Date;

  @Exclude()
  updatedAt?: Date;

  @Exclude()
  deletedAt?: Date;
}

export class TaskPaginationResponseDto {
  @Expose()
  @Type(() => TaskResponseDto)
  @ApiProperty({
    type: TaskResponseDto,
    isArray: true,
    description: "Listado de tareas",
  })
  data: TaskResponseDto[];

  @Expose()
  @ApiProperty({
    type: MetaDto,
    description: "Información de paginación",
  })
  meta: MetaDto;
}
