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
  userName_who_posted: string;
  pictures: string[];
  feedbacks: IFeedbackRental[];
}

const RentalSchema: Schema = new Schema({
  title: { type: String, required: true  },
  price: { type: Number, required: true  },
  price_garanty: { type: Boolean, required: true  },
  rooms: { type: Number, required: true  },
  whole_or_split: { type: Boolean, required: true  },
  requirements: { type: Object, required: true  },
  location: { type: String, required: true  },
  description: { type: String, required: true  },
  userName_who_posted: { type: String, required: true  },
  pictures: [{ type: String }],
  feedbacks: [{ type: Object }]
});

export const Rental: Model<IRental> = mongoose.model<IRental>('Rental', RentalSchema);
