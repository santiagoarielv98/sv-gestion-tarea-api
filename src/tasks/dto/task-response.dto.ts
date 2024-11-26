import { Exclude, Expose, Type } from "class-transformer";
import { TagResponseDto } from "../../tags/dto/tag-response.dto";

export class TaskResponseDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  content?: string;

  @Expose()
  @Type(() => TagResponseDto)
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
  data: TaskResponseDto[];

  @Expose()
  meta: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    itemsPerPage: number;
  };
}
