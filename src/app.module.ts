import { Module } from "@nestjs/common";
import { TasksModule } from "./tasks/tasks.module";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { TagsModule } from "./tags/tags.module";
import * as Joi from "joi";

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        PORT: Joi.number().default(3000),
        DATABASE_URL: Joi.string(),
        SALT_ROUNDS: Joi.number().default(10),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION: Joi.string().required(),
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
