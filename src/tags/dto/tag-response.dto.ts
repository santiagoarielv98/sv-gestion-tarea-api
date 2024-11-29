import { ApiProperty } from "@nestjs/swagger";
import { Expose, Exclude, Type } from "class-transformer";
import { MetaDto } from "../../pagination/dto/meta.dto";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class TagResponseDto {
  @Expose()
  @ApiProperty({
    description: "Identificador único de la etiqueta",
    example: 1,
    default: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @Expose()
  @ApiProperty({
    description: "Nombre de la etiqueta",
    example: "Node.js",
    default: "Node.js",
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @Exclude()
  createdAt?: Date;

  @Exclude()
  updatedAt?: Date;

  @Exclude()
  deletedAt?: Date;
}

export class TagPaginationResponseDto {
  @Expose()
  @Type(() => TagResponseDto)
  @ApiProperty({
    type: TagResponseDto,
    isArray: true,
    description: "Listado de etiquetas",
  })
  data: TagResponseDto[];

  @Expose()
  @Type(() => MetaDto)
  @ApiProperty({
    type: MetaDto,
    description: "Información de paginación",
  })
  meta: MetaDto;
}
