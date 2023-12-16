import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Card {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  cardNumber: string;

  @Prop({ required: true })
  cvv: string;

  @Prop({ required: true })
  expiryDate: string;

  @Prop({ required: true })
  user: string;
}
export const CardSchema = SchemaFactory.createForClass(Card);
