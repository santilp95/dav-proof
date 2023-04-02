import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

const logger = new Logger('APP');
const port = 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('User Davivienda')
    .setDescription('Reto para Davivienda')
    .setVersion('1.0')
    .addTag('davivienda')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(port, () => {
    logger.log(`⛱ server running on port ${port}`);
  });
}
bootstrap();
