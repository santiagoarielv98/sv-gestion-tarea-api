import { NotFoundException } from "@nestjs/common";

export class TagSomeNotFoundException extends NotFoundException {
  constructor() {
    super("Algunas etiquetas no encontradas");
  }
}
