import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PrismaModule } from './prisma/prisma.module';
import { ProductModule } from './product/product.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { OrderModule } from './order/order.module';
import { RequestModule } from './request/request.module';
@Module({
  imports: [PrismaModule, ProductModule, AuthModule, UserModule, OrderModule, RequestModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
