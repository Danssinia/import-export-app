import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { RequestModule } from './request/request.module';

@Module({
  imports: [AuthModule, UserModule, ProductModule, OrderModule, RequestModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
