import { NotFoundException } from "@nestjs/common";

export class TagNotDeletedException extends NotFoundException {
  constructor(id: number) {
    super(`Etiqueta con ID ${id} no eliminada`);
  }
}
