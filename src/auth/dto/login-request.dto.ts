import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";
import { userDemoConfig } from "src/config/user-demo.config";

export class LoginRequestDto {
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(100)
  @ApiProperty({
    description: "El correo electrónico del usuario",
    example: userDemoConfig.email,
    default: userDemoConfig.email,
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(100)
  @ApiProperty({
    description: "La contraseña del usuario",
    example: userDemoConfig.password,
    default: userDemoConfig.password,
  })
  password: string;
}
