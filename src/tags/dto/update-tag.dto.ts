import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UpdateTagDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "Nombre de la etiqueta",
    example: "Node.js",
    default: "Node.js",
  })
  name: string;
}
