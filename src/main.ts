import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets('uploads',{
    prefix: 'uploads/'
  })

  const config = new DocumentBuilder()
  .setTitle('Import Export API')
  .setDescription('complete API for the APP')
  .setVersion('1.0')
  .addTag('import')
  .build();

  const documentFactory = () => SwaggerModule.createDocument(app,config);
  SwaggerModule.setup('api',app,documentFactory)

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
