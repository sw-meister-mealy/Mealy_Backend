import { config } from '@app/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { start } from 'elastic-apm-node';
import { AppModule } from './app.module';

if (config.apm) {
  const apm = start({
    environment: config.nodeEnv,
    serverUrl: config.apm,
    serviceName: 'Mealy',
  });
  setInterval(() => {
    apm.flush();
  }, 5000);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Mealy')
    .setDescription('Mealy API description')
    .setVersion(process.env.npm_package_version)
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(config.port, config.host);
}

bootstrap();
