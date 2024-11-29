import { NotFoundException } from "@nestjs/common";

export class TaskNotDeletedException extends NotFoundException {
  constructor(id: number) {
    super(`Tarea con ID ${id} no eliminada`);
  }
}
