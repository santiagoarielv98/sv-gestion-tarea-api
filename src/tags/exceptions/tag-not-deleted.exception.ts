import { NotFoundException } from "@nestjs/common";

export class TagNotDeletedException extends NotFoundException {
  constructor(id: number) {
    super(`Tag with ID ${id} not deleted`);
  }
}
