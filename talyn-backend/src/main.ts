import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  // Security headers: XSS protection, clickjacking prevention, CSP, frame guard.
  app.use(helmet());
 app.use(cookieParser.default(config.get<string>('cookie.secret')));
  // CORS: only the configured frontend origin, never '*'.
  app.enableCors({
    origin: config.get<string>('frontendUrl'),
    credentials: true,
  });

  // Global validation: reject unknown fields, strip extras, auto-transform types.
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const port = config.get<number>('port')!;
  await app.listen(port);
  console.log(`Mentor platform API listening on port ${port}`);
}

bootstrap();
