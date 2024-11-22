import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { TagsService } from "./tags.service";
import { CreateTagDto } from "./dto/create-tag.dto";
import { UpdateTagDto } from "./dto/update-tag.dto";
import { CurrentUser } from "src/auth/current-user.decorator";
import { User } from "src/users/interfaces/user.interface";

@Controller("tags")
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  create(@Body() createTagDto: CreateTagDto, @CurrentUser() user: User) {
    return this.tagsService.create(createTagDto, user.id);
  }

  @Get()
  findAll(@CurrentUser() user: User) {
    return this.tagsService.findAll(user.id);
  }

  @Get(":id")
  findOne(@Param("id") id: number, @CurrentUser() user: User) {
    return this.tagsService.findOne(id, user.id);
  }

  @Patch(":id")
  update(
    @Param("id") id: number,
    @Body() updateTagDto: UpdateTagDto,
    @CurrentUser() user: User
  ) {
    return this.tagsService.update(id, updateTagDto, user.id);
  }

  @Delete(":id")
  remove(@Param("id") id: number, @CurrentUser() user: User) {
    return this.tagsService.remove(id, user.id);
  }

  @Patch(":id/restore")
  restore(@Param("id") id: number, @CurrentUser() user: User) {
    return this.tagsService.restore(id, user.id);
  }
}
