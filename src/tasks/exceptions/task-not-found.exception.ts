import { NotFoundException } from "@nestjs/common";

export class TaskNotFoundException extends NotFoundException {
  constructor(id: number) {
    super(`Tarea con ID ${id} no encontrada`);
  }
}
