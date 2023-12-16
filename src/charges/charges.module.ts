import { Module } from '@nestjs/common';
import { ChargesService } from './charges.service';
import { ChargesController } from './charges.controller';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { CardsModule } from 'src/cards/cards.module';

@Module({
  imports: [AuthModule, UsersModule, CardsModule],
  controllers: [ChargesController],
  providers: [ChargesService],
})
export class ChargesModule {}
