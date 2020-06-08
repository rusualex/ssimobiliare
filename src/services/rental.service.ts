import { IMongoResponse } from '../model/mongo-response.model';
import { IRental, Rental } from '../model/rental.model';

export class RentalService {
  async getRentals(filter: object): Promise<IRental[]> {
    return Rental.find(filter);
  }

  async getRentalById(rentalId: string): Promise<IRental> {
    return Rental.findOne({ _id: rentalId });
  }

  async getRentalByWhoPosted(rentalPoster:string):Promise<IRental> {
    return Rental.findOne({ username_who_posted: rentalPoster });
  }

  async saveRental(rental: IRental): Promise<IRental> {
    return new Rental(rental).save();
  }

  async updateRental(rental: IRental): Promise<IMongoResponse> {
    return Rental.updateOne({ _id: rental._id }, { $set: rental });
  }

  async deleteRentalById(rentalId: string): Promise<IMongoResponse> {
    return Rental.deleteOne({ _id: rentalId });
  }


  // async deleteNestedUsers(userId: string): Promise<void> {
  //   const rentals: IRental[] = await this.getRentalsByNestedUserId(userId);

  //   rentals.forEach((rental: IRental) => {
  //     const attendingUserIndex: number = rental.attendingUsers
  //       .findIndex((attendingUser: IUser) => attendingUser._id === userId);
  //     if (attendingUserIndex !== -1) {
  //       rental.attendingUsers.splice(attendingUserIndex);
  //     }

  //     const trainerIndex: number = rental.trainers
  //       .findIndex((trainer: IUser) => trainer._id === userId);
  //     if (trainerIndex !== -1) {
  //       rental.trainers.splice(trainerIndex);
  //     }

  //     this.updateRental(rental);
  //   });
  // }

  // private async getRentalsByNestedUserId(userId: string): Promise<IRental[]> {
  //   return this.getRentals({
  //     $or:
  //       [
  //         {'attendingUsers._id': userId},
  //         {'trainers._id': userId}
  //       ]
  //   });
  // }
}
