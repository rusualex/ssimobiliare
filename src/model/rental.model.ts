import { IRequirement } from './requirement.model';
import * as mongoose from 'mongoose';
import { Document, Model, Schema } from 'mongoose';
import { IFeedbackRental } from './feedback-rental.model';

export interface IRental extends Document {
  _id: string;
  id: string;
  title: string;
  price: number;
  price_garanty: boolean;
  rooms: number;
  whole_or_split: boolean;
  requirements: IRequirement;
  location: string;
  description: string;
  username_who_posted: string;
  pictures: string[];
  feedbacks: IFeedbackRental[];
}

const RentalSchema: Schema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  mapLink: { type: String, required: true },
  details: { type: String, required: true },
  user_id: { type: String, required: true },
  pictureFileName: { type: String, required: true }
});

export const Rental: Model<IRental> = mongoose.model<IRental>('Rental', RentalSchema);
