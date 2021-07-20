import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ApiExceptionFilter } from 'src/api/0 - Presentation/Filters/api-exception.filter';
import { setupSwagger } from 'src/environment/swagger/swagger.configuration';
import { AppModule } from './app.module';
import * as helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());

  const logger = new Logger();

  setupSwagger(app, logger);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new ApiExceptionFilter());

  await app.listen(3001);
  await logger.log(
    `Nest application running on port ${3001}`,
    'NestApplication',
  );
}
bootstrap();
