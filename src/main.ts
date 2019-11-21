import { config } from '@app/config';
import { NestFactory } from '@nestjs/core';
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
  await app.listen(config.port, config.host);
}

bootstrap();
