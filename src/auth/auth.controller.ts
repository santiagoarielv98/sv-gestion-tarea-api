import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { LoginRequestDto } from "./dto/login-request.dto";
import { LoginResponseDto } from "./dto/login-response.dto";
import { RegisterRequestDto } from "./dto/register-request.dto";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { LocalAuthGuard } from "./local-auth.guard";
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post("login")
  @ApiBody({ type: LoginRequestDto })
  @ApiCreatedResponse({
    description: "Inicio de sesión exitoso",
    type: LoginResponseDto,
  })
  @ApiBadRequestResponse({
    description: "Datos inválidos",
    schema: {
      example: {
        statusCode: 400,
        message: [
          "These credentials do not match our records.",
          "The email field is required.",
          "The password field is required.",
          "...",
        ],
        error: "Bad Request",
      },
    },
  })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(LocalAuthGuard)
  @Post("logout")
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: "Cierre de sesión exitoso" })
  async logout(@Request() req) {
    return req.logout();
  }

  @UseGuards(JwtAuthGuard)
  @Get("profile")
  @ApiBearerAuth()
  @ApiOkResponse({ description: "Perfil del usuario" })
  getProfile(@Request() req) {
    return req.user;
  }

  @Post("register")
  @ApiBody({ type: RegisterRequestDto })
  @ApiCreatedResponse({ description: "Registro exitoso" })
  @ApiBadRequestResponse({
    description: "Datos inválidos",
    schema: {
      example: {
        statusCode: 400,
        message: [
          "The email has already been taken.",
          "The email field is required.",
          "The password field is required.",
          "...",
        ],
        error: "Bad Request",
      },
    },
  })
  async register(@Body() registerRequestDto: RegisterRequestDto) {
    return this.authService.register(registerRequestDto);
  }
}
