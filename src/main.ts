import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { HttpLoggingInterceptor } from './common/logger/http-logging.interceptor';
import { configureSwagger, startServer } from './constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global HTTP logging interceptor
  app.useGlobalInterceptors(app.get(HttpLoggingInterceptor));

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Cookie parser for JWT tokens
  app.use(cookieParser());

  configureSwagger(app);

  await startServer(app);
}

void bootstrap();
