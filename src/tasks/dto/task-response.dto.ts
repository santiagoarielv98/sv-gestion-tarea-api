import { Expose, Exclude } from "class-transformer";

export class TaskResponseDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  content?: string;

  @Exclude()
  createdAt?: Date;

  @Exclude()
  updatedAt?: Date;

  @Exclude()
  deletedAt?: Date;
}
