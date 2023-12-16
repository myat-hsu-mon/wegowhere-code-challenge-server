import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CardsModule } from './cards/cards.module';

@Module({
  imports: [UsersModule, AuthModule, CardsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
