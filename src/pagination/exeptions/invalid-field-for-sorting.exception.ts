import { HttpException, HttpStatus } from "@nestjs/common";

export class InvalidFieldForSortingException extends HttpException {
  constructor(field: string) {
    super(`Campo inválido para ordenar: ${field}`, HttpStatus.BAD_REQUEST);
  }
}
