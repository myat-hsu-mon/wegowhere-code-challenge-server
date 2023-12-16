import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
export class CreateChargeDto {
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly currency: string;

  @IsString()
  @IsNotEmpty()
  readonly amount: string;

  @IsString()
  @IsNotEmpty()
  readonly cardId: string;
}
