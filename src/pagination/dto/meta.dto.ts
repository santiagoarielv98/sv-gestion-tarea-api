import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class MetaDto {
  @Expose()
  @ApiProperty({
    description: "Número total de elementos",
    example: 100,
    default: 100,
  })
  totalItems: number;

  @Expose()
  @ApiProperty({
    description: "Número total de páginas",
    example: 10,
    default: 10,
  })
  totalPages: number;

  @Expose()
  @ApiProperty({
    description: "Página actual",
    example: 1,
    default: 1,
  })
  currentPage: number;

  @Expose()
  @ApiProperty({
    description: "Número de elementos por página",
    example: 10,
    default: 10,
  })
  itemsPerPage: number;
}
