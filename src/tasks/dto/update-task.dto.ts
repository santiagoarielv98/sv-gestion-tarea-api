import { ApiProperty } from "@nestjs/swagger";
import { CreateTaskDto } from "./create-task.dto";
import { IsBoolean, IsOptional } from "class-validator";
export class UpdateTaskDto extends CreateTaskDto {
  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    description: "Indica si la tarea ha sido completada",
    example: false,
    default: false,
    required: false,
  })
  completed?: boolean;
}
