import { hashService } from '../index';
import { IMongoResponse } from '../model/mongo-response.model';
import { IUser, User } from '../model/user.model';

export class UserService {
  async getUsers(): Promise<IUser[]> {
    return User.find();
  }

  async getUserById(_id: string): Promise<IUser> {
    return User.findById({ _id });
  }

  async getUserByUsername(userName: string): Promise<IUser> {
    return User.findOne({ userName });
  }

  async saveUser(user: IUser): Promise<IUser> {
    user.encrypted_password = await hashService.encrypt(user.encrypted_password);

    return new User(user).save();
  }

  async updateUser(user: IUser): Promise<IMongoResponse> {
    const currentUser: IUser = await this.getUserById(user._id);
    const samePassword: boolean = user.encrypted_password === currentUser.encrypted_password;

    if (!samePassword) {
      user.encrypted_password = await hashService.encrypt(user.encrypted_password);
    }

    // await rentalService.updateNestedUsers(user);

    return User.updateOne({ _id: user._id }, { $set: user });
  }

  async deleteUserById(userId: string): Promise<IMongoResponse> {
    // await rentalService.deleteNestedUsers(userId);

    return User.deleteOne({ _id: userId });
  }
}
