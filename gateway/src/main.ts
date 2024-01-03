import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import { ValidationPipe } from '@nestjs/common';
// import * as dotenv from 'dotenv';
//import { config } from 'dotenv'

async function bootstrap() {
  // dotenv.config();
  // config();
  //console.log('Loaded Environment Variables:', process.env);
  const server = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  await app.init();

  app.useGlobalPipes(new ValidationPipe());
  await app.init();
  return server;
}

bootstrap()
  .then((server) => {
    server.listen(3000, () =>
      console.log('Gateway is running on http://localhost:3000'),
    );
  })
  .catch((err) => console.error('Gateway initialization failed', err));
