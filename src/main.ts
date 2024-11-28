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
    })
  );
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector), {
      excludeExtraneousValues: true,
    })
  );

  const config = new DocumentBuilder()
    .setTitle("Sv - Gestion de Tareas API")
    // .setDescription("API para la gestión de tareas")
    // explicar que es
    .setVersion("1.0")
    .addTag("API")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api-docs", app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
