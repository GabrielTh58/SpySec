import { NestFactory } from '@nestjs/core';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ResultExceptionFilter } from './common/filters/result-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useGlobalFilters(new ResultExceptionFilter());

  configureSwagger(app);
  configureValidationPipe(app);
  await app.listen(process.env.PORT ?? 4000);

  function configureSwagger(app: INestApplication) {
    const config = new DocumentBuilder()
      .setTitle('SpySec API')
      .setDescription('Documentação da API do SpySec')
      .setVersion('1.0')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  }

  function configureValidationPipe(app: any) {
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    );
  }
}
bootstrap();
