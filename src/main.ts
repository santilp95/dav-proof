import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';

const logger = new Logger('APP');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);
  logger.log('Project with env ' + configService.get<string>('PROJECT_ID'));
  const port = configService.get<string>('PORT') || 3000;
  const config = new DocumentBuilder()
    .setTitle(
      `${configService.get<string>('APP_NAME')} By ${configService.get<string>(
        'COMPANY_NAME',
      )}`,
    )
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
