import * as mongoose from 'mongoose';
import { Document, Model, Schema } from 'mongoose';

export interface IUser extends Document {
  id: string;
  userName: string;
  lastName: string;
  firstName: string;
  email: string;
  encrypted_password: string;
  telephone: string;
}

const UserSchema: Schema = new Schema({
  userName: { type: String, required: true, unique: true },
  lastName: { type: String, required: true },
  firstName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  encrypted_password: { type: String, required: true },
  telephone: { type: String, required: true, unique: true }
});

export const User: Model<IUser> = mongoose.model<IUser>('User', UserSchema);
