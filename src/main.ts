import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, 
    transform: true,
    forbidNonWhitelisted: true,
  }));
  
  // Apply the transform interceptor globally
  app.useGlobalInterceptors(new TransformInterceptor());

  // Swagger setup
  const config = new DocumentBuilder()
  .setTitle('Prehab API')
  .setDescription('Exercise tracking API with social features')
  .setVersion('1.0')
  .addTag('auth', 'Authentication operations')
  .addTag('exercises', 'Exercise management operations')
  .addTag('favorites', 'Exercise favorites operations')
  .addTag('saves', 'Exercise saves operations')
  .addTag('ratings', 'Exercise ratings operations')
  .addBearerAuth()
  .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Get port from config
  const configService = app.get(ConfigService);
  const port = configService.get('PORT') || 3000;
  
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
  console.log(`Swagger UI available at: http://localhost:${port}/api`);
}
bootstrap();