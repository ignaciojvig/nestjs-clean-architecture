import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { setupSwagger } from 'src/environment/swagger/swagger.configuration';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger();

  setupSwagger(app, logger);

  await app.listen(3001);
  await logger.log(
    `Nest application running on port ${3001}`,
    'NestApplication',
  );
}
bootstrap();
