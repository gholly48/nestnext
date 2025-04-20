import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000', // آدرس NextJS
    credentials: true,
  });
  await app.listen(9000);
  console.log('Nest Server Running On Port 9000 !!')
}
bootstrap();