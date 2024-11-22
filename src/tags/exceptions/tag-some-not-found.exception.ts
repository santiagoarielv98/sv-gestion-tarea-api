import { NotFoundException } from "@nestjs/common";

export class TagSomeNotFoundException extends NotFoundException {
  constructor() {
    super("Some tags not found");
  }
}
