import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dtos/cards.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/users/user.decorator';

@UseGuards(AuthGuard)
@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}
  @Get()
  async getAllCards(@Res() response, @User() user) {
    const cards = await this.cardsService.getAllCards(user);
    return response
      .status(HttpStatus.OK)
      .json({ message: 'success', data: cards });
  }

  @Post()
  async createCard(
    @User() user,
    @Res() response,
    @Body() createCardDto: CreateCardDto,
  ) {
    const newCard = await this.cardsService.createNewCard(createCardDto, user);
    return response.status(HttpStatus.CREATED).json({
      message: ['success'],
      data: newCard,
      error: null,
      statusCode: HttpStatus.CREATED,
    });
  }
}
