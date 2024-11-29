import { NotFoundException } from "@nestjs/common";

export class TagNotFoundException extends NotFoundException {
  constructor(id: number) {
    // super(`Tag with ID ${id} not found`);
    // en español
    super(`Etiqueta con ID ${id} no encontrada`);
  }
}
