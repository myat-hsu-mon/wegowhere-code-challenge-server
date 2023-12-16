import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Card } from './schemas/card.schema';
import { Model } from 'mongoose';

@Injectable()
export class CardsService {
  constructor(@InjectModel('Card') private readonly cardModel: Model<Card>) {}
  async getAllCards(user): Promise<Card[]> {
    return await this.cardModel.find({ user: user._id }).exec();
  }

  async getCardById(id: string) {
    const card = await this.cardModel.findById(id).exec();
    return card;
  }

  async createNewCard(card, user): Promise<Card> {
    card.user = user._id;
    const newCard = await new this.cardModel(card);
    return newCard.save();
  }
}
