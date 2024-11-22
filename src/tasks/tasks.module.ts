import { Module } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { TasksController } from "./tasks.controller";
import { PrismaService } from "../prisma.service";
import { TagsService } from "src/tags/tags.service";

@Module({
  providers: [TasksService, PrismaService, TagsService],
  controllers: [TasksController],
})
export class TasksModule {}
