import { BadRequestException, Injectable } from '@nestjs/common';
import { SignupDto } from './dtos/signup.dto';
import { UsersService } from 'src/users/users.service';
import { SignInDto } from './dtos/signin.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signup(signupDto: SignupDto) {
    const { password, confirmPassword } = signupDto;
    if (password !== confirmPassword)
      throw new BadRequestException('passwords are not equal');
    const newUser = await this.usersService.createUser(signupDto);
    newUser.password = null;
    const user = { _id: newUser._id };
    const jwtToken = await this.jwtService.sign(user);
    return [newUser._id, jwtToken];
  }

  async signin(signinDto: SignInDto) {
    const user = await this.usersService.getUserByEmail(signinDto.email);
    if (!user) throw new BadRequestException('No user found');
    if (user.password !== signinDto.password)
      throw new BadRequestException('Incorrect password');
    user.password = null;
    const jwtToken = await this.generateToken(user);
    return [user, jwtToken];
  }

  async generateToken(user) {
    const token = this.jwtService.sign({ id: user._id });
    return token;
  }

  async validateToken(token) {
    return this.jwtService.verify(token, {
      secret: 'KIygwaXroCpqcDuonr2Ch3OF1mdwh7Ae',
    });
  }
}
