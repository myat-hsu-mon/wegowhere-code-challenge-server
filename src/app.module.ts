import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CardsModule } from './cards/cards.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ChargesModule } from './charges/charges.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    CardsModule,
    MongooseModule.forRoot('mongodb://localhost/payment'),
    ChargesModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
