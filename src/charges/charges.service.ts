import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateChargeDto } from './dtos/createCharge.dto';
import { UsersService } from 'src/users/users.service';
import { CardsService } from 'src/cards/cards.service';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const omise = require('omise')({
  publicKey: 'pkey_test_5wvisbxphp1zapg8ie6',
});

// eslint-disable-next-line @typescript-eslint/no-var-requires
const omiseCharge = require('omise')({
  secretKey: 'skey_test_5wvisdjjoqmfof5npzw',
});
@Injectable()
export class ChargesService {
  constructor(
    private readonly usersService: UsersService,
    private readonly cardsService: CardsService,
  ) {}
  async createToken(cardInfo) {
    const [month, year] = cardInfo.expiryDate.split('/');
    try {
      const token = await omise.tokens.create({
        card: {
          name: cardInfo.name,
          number: cardInfo.cardNumber,
          expiration_month: month,
          expiration_year: year,
          security_code: cardInfo.cvv,
        },
      });
      return token;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async createCharge(createChargeDto: CreateChargeDto, user) {
    const { amount, currency } = createChargeDto;
    const card = await this.cardsService.getCardById(createChargeDto.cardId);
    if (card && card.user != user._id)
      throw new BadRequestException('You are not authorized');
    const token = await this.createToken(card);
    const charge = await omiseCharge.charges.create({
      amount: amount || 0,
      currency: currency || 'thb',
      card: token.id,
    });
    return charge;
  }
}
