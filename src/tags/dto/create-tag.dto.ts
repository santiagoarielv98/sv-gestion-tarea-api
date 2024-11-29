import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";
export class CreateTagDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "Nombre de la etiqueta",
    example: "Node.js",
    default: "Node.js",
  })
  name: string;
}
