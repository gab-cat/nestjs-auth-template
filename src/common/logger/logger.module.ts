import { Global, Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { HttpLoggingInterceptor } from './http-logging.interceptor';

@Global()
@Module({
  providers: [LoggerService, HttpLoggingInterceptor],
  exports: [LoggerService, HttpLoggingInterceptor],
})
export class LoggerModule {}
