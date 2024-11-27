import { Type } from "class-transformer";
import * as Validator from "class-validator";
import { SortOrder } from "../enums/sort-order.enum";

export class PaginationDto {
  @Validator.IsOptional()
  @Validator.IsInt()
  @Type(() => Number)
  @Validator.Min(1)
  page?: number = 1;

  @Validator.IsOptional()
  @Validator.IsInt()
  @Type(() => Number)
  @Validator.Min(1)
  limit?: number = 10;

  @Validator.IsOptional()
  @Validator.IsString()
  @Validator.IsEnum(SortOrder)
  sort?: SortOrder = SortOrder.ASC;

  @Validator.IsOptional()
  @Validator.IsString()
  q?: string;
}
