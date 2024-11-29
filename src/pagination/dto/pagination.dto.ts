import { Type } from "class-transformer";
import { IsEnum, IsInt, IsOptional, IsString, Min } from "class-validator";
import { SortOrder } from "../enums/sort-order.enum";
import { ApiProperty } from "@nestjs/swagger";

export class PaginationDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(1)
  limit?: number = 10;

  @IsOptional()
  @IsString()
  @IsEnum(SortOrder)
  order?: SortOrder;

  @IsOptional()
  @IsString()
  sort?: string;

  @IsOptional()
  @IsString()
  q?: string = "";
}
