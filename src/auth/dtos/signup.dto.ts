import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
export class SignupDto {
  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  readonly confirmPassword: string;
}
