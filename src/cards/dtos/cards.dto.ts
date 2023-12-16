import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
export class CreateCardDto {
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  readonly cardNumber: string;

  @IsString()
  @IsNotEmpty()
  readonly expiryDate: string;

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly cvv: string;
}
