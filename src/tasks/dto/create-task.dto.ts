import { ApiProperty } from "@nestjs/swagger";
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from "class-validator";

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: "Título de la tarea",
    example: "Comprar leche",
    default: "Comprar leche",
  })
  title: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: "Contenido de la tarea",
    example: "Leche descremada",
    default: "Leche descremada",
    required: false,
  })
  content?: string;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  @IsPositive({ each: true })
  @ApiProperty({
    description: "Lista de identificadores de etiquetas",
    example: [1, 2, 3],
    default: [1, 2, 3],
    required: false,
  })
  tags?: number[];
}
