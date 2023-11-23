import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ErrorInterceptor, HeaderInterceptor } from './global';
import { ZodValidationPipe } from 'nestjs-zod';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ZodValidationPipe());
  app.enableCors();
  app.useGlobalInterceptors(new HeaderInterceptor());
  app.useGlobalInterceptors(new ErrorInterceptor());
  await app.listen(3000);
}

bootstrap();
