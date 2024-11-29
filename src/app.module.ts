import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import * as Joi from "joi";
import { AuthModule } from "./auth/auth.module";
import { TagsModule } from "./tags/tags.module";
import { TasksModule } from "./tasks/tasks.module";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        PORT: Joi.number().default(3000),
        SALT_ROUNDS: Joi.number().default(10),
        JWT_EXPIRATION: Joi.string().default("1d"),
        JWT_SECRET: Joi.string().required(),
        DATABASE_URL: Joi.string(),
      }),
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
      isGlobal: true,
    }),
    TasksModule,
    UsersModule,
    AuthModule,
    TagsModule,
  ],
  controllers: [],
})
export class AppModule {}
