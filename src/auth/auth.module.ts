import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
  imports: [
    JwtModule.register({
      secret: 'KIygwaXroCpqcDuonr2Ch3OF1mdwh7Ae',
    }),
    UsersModule,
  ],
})
export class AuthModule {}
