import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dtos/signup.dto';
import { SignInDto } from './dtos/signin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async signup(@Body() signupDto: SignupDto, @Res() response) {
    try {
      const [_id, jwtToken] = await this.authService.signup(signupDto);
      return response.status(HttpStatus.CREATED).json({
        message: ['success'],
        erro: null,
        data: { token: jwtToken, user: { _id } },
      });
    } catch (error) {
      if (error.code === 11000) error.message = 'User already exists';
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: [error.message],
      });
    }
  }

  @Post('sign-in')
  async signin(@Body() signinDto: SignInDto, @Res() response) {
    try {
      const [user, jwtToken] = await this.authService.signin(signinDto);
      return response.status(HttpStatus.OK).json({
        message: ['success'],
        erro: null,
        data: {
          token: jwtToken,
          user,
        },
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: [error.message],
      });
    }
  }
}
