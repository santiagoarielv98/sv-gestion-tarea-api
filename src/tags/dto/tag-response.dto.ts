import { Expose, Exclude, Type } from "class-transformer";

export class TagResponseDto {
  @Expose()
  id: number;

  @Expose()
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
  data: TagResponseDto[];

  @Expose()
  meta: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    itemsPerPage: number;
  };
}
