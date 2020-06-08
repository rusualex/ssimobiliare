import { IUser } from './../model/user.model';
export class IdMapper {
    constructor(){};
    async remapUser(user: IUser) {
        const customUser = user;
        customUser.id = customUser._id;

        return customUser;
    }
}