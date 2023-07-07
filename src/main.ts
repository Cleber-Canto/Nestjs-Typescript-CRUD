/* eslint-disable prettier/prettier */
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NotFoundInterceptor } from './interceptors/not-found.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Pipes
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // -> transforma o dado para o formato correto
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Interceptors
  app.useGlobalInterceptors(new NotFoundInterceptor());

  await app.listen(3000);
}
bootstrap();