import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';
import { getDataSourceToken } from '@nestjs/typeorm';
import { seedListAdministrativeProcess } from './database/seed-list-administrative-process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
    allowedHeaders: '*'
  })

  const config = new DocumentBuilder()
    .setTitle('DocRoadMap API')
    .setDescription('The DocRoadMap API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, documentFactory);

  const dataSource = app.get<DataSource>(getDataSourceToken());
  await seedListAdministrativeProcess(dataSource);

  await app.listen(process.env.PORT ?? 8082);
}
bootstrap();
