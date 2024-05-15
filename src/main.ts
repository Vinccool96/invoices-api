import { NestFactory } from "@nestjs/core"
import { ValidationPipe } from "@nestjs/common"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"

import { AppModule } from "./app.module"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      always: true,
      transformOptions: {
        enableImplicitConversion: true,
        enableCircularCheck: true,
      },
    }),
  )

  const config = new DocumentBuilder()
    .setTitle("Invoices API")
    .setDescription("The Invoices API implemented with NestJS")
    .setVersion("1.0")
    .addTag("cats")
    .addBasicAuth()
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("api", app, document)

  await app.listen(3001)
}
void bootstrap()
