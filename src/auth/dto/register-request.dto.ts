import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

export class RegisterRequestDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  @ApiProperty({
    description: "Nombre completo del usuario",
    minLength: 3,
    maxLength: 100,
    example: "John Doe",
  })
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(100)
  @ApiProperty({
    description: "Correo electrónico del usuario",
    maxLength: 100,
    example: "john.doe@example.com",
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(100)
  @ApiProperty({
    description: "Contraseña del usuario",
    minLength: 6,
    maxLength: 100,
    example: "password",
  })
  password: string;
}
