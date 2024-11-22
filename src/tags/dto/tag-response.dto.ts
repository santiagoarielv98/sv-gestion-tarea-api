import { Expose, Exclude } from "class-transformer";

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
