import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const setupSwagger = (nestApp: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Series API')
    .setDescription('The Series API Documentation')
    .setVersion('1.0')
    .addTag('Series')
    .build();

  const swaggerDocument = SwaggerModule.createDocument(nestApp, config);
  SwaggerModule.setup('api', nestApp, swaggerDocument);
};
