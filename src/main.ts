import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { HttpLoggingInterceptor } from './common/logger/http-logging.interceptor';
import { configureSwagger, SERVER, showStartupMessages } from './constants';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Serve static files from public directory
  app.useStaticAssets(join(__dirname, '..', 'public'));

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

  app.disable('x-powered-by');

  await app.listen(SERVER.PORT);

  showStartupMessages();
}

void bootstrap();
