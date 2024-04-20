import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 정의되지 않은 필드들은 요청 객체에서 자동으로 제거
      forbidNonWhitelisted: true,
      // DTO에 정의되지 않은 속성을 요청에 포함시킬 경우, 요청 자체가 거부하며, whitelist와 같이 사용해야 한다.
      transform: true, // 요청의 본문을 자동으로 DTO 타입으로 변환
    }),
  );
  await app.listen(3000);
}
bootstrap();
