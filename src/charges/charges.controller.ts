import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ChargesService } from './charges.service';
import { CreateChargeDto } from './dtos/createCharge.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/users/user.decorator';

@Controller('charges')
export class ChargesController {
  constructor(private readonly chargesService: ChargesService) {}

  @UseGuards(AuthGuard)
  @Post()
  async createCharge(
    @Res() response,
    @User() user,
    @Body() createChargeDto: CreateChargeDto,
  ) {
    try {
      const newCharge = await this.chargesService.createCharge(
        createChargeDto,
        user,
      );
      // console.log({ chargeResult: newCharge });
      return response
        .status(HttpStatus.CREATED)
        .json({ message: ['success'], error: null, data: newCharge });
    } catch (error) {
      console.log(error);
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: [error.message],
        error: error.code,
        data: null,
      });
    }
  }
}
