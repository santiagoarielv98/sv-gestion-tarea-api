import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { TagsService } from "./tags.service";
import { CreateTagDto } from "./dto/create-tag.dto";
import { UpdateTagDto } from "./dto/update-tag.dto";
import { CurrentUser } from "src/auth/current-user.decorator";
import { User } from "src/users/interfaces/user.interface";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("tags")
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createTagDto: CreateTagDto, @CurrentUser() user: User) {
    return this.tagsService.create(createTagDto, user.id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@CurrentUser() user: User) {
    return this.tagsService.findAll(user.id);
  }

  @Get(":id")
  @UseGuards(JwtAuthGuard)
  findOne(@Param("id") id: number, @CurrentUser() user: User) {
    return this.tagsService.findOne(id, user.id);
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard)
  update(
    @Param("id") id: number,
    @Body() updateTagDto: UpdateTagDto,
    @CurrentUser() user: User
  ) {
    return this.tagsService.update(id, updateTagDto, user.id);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  remove(@Param("id") id: number, @CurrentUser() user: User) {
    return this.tagsService.remove(id, user.id);
  }

  @Patch(":id/restore")
  @UseGuards(JwtAuthGuard)
  restore(@Param("id") id: number, @CurrentUser() user: User) {
    return this.tagsService.restore(id, user.id);
  }
}
