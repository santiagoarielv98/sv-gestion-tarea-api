import { NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ClassSerializerInterceptor, ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: "*",
  });

  app.setGlobalPrefix("api");
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector), {
      excludeExtraneousValues: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle("SV - Gestion de Tareas API")
    .setDescription("API de gestión de tareas, desarrollada con NestJS")
    .setVersion("1.0")
    .addTag("API")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("/", app, document, {
    customCssUrl: "https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui.css",
    customJs: [
      "https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui-bundle.js",
      "https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui-standalone-preset.js",
    ],
  });

  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
