import { IUser } from './user.model';

export interface IAuth {
  token?: string;
  user: IUser;
}
