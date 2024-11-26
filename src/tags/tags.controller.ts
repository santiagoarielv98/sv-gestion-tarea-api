import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  SerializeOptions,
  ClassSerializerInterceptor,
  UseInterceptors,
  Query,
} from "@nestjs/common";
import { TagsService } from "./tags.service";
import { CreateTagDto } from "./dto/create-tag.dto";
import { UpdateTagDto } from "./dto/update-tag.dto";
import { CurrentUser } from "../auth/current-user.decorator";
import { User } from "../users/interfaces/user.interface";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import {
  TagResponseDto,
  TagPaginationResponseDto,
} from "./dto/tag-response.dto";
import { PaginationInterceptor } from "src/pagination/pagination.interceptor";
import { PaginationDto } from "src/pagination/dto/pagination.dto";

@Controller("tags")
@SerializeOptions({
  type: TagResponseDto,
})
@UseInterceptors(ClassSerializerInterceptor)
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

  @Get("all")
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(PaginationInterceptor)
  @SerializeOptions({
    type: TagPaginationResponseDto,
  })
  async getAll(
    @Query() paginationDto: PaginationDto,
    @CurrentUser() user: User
  ) {
    return await this.tagsService.paginate(paginationDto, user.id);
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
