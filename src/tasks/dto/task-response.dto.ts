import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose, Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { MetaDto } from "../../pagination/dto/meta.dto";
import { TagResponseDto } from "../../tags/dto/tag-response.dto";

export class TaskResponseDto {
  @Expose()
  @ApiProperty({
    description: "Identificador de la tarea",
    example: 1,
    default: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @Expose()
  @ApiProperty({
    description: "Título de la tarea",
    example: "Comprar leche",
    default: "Comprar leche",
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @Expose()
  @ApiProperty({
    description: "Contenido de la tarea",
    example: "Leche descremada",
    default: "Leche descremada",
    required: false,
  })
  @IsOptional()
  @IsString()
  content?: string | null;

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
