import * as bcrypt from 'bcrypt';
import config from 'config';
import * as jwt from 'jsonwebtoken';
import { userService } from '../index';
import { IAuth } from '../model/auth.model';
import { IResetBody } from '../model/reset.model';
import { IUser } from '../model/user.model';

export class LoginService {
  async login(username: string, password: string): Promise<IUser> {
    const user: IUser = await userService.getUserByusername(username);
    if (user) {
      const isValidPassword: boolean = await bcrypt.compare(password, user.encrypted_password);
      if (isValidPassword) {

        return user;
        // {
        // token: jwt.sign({ _id: user._id }, config.get('jwtPrivateKey')),
        // user
        // };
      }
    }

    return null;
  }

  async resetPassword(body: IResetBody): Promise<boolean> {
    const user: IUser = await userService.getUserByusername(body.resetEmail);
    // if (user) {
    //   await nodemailer.createTestAccount();

    //   const transporter: Mail = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: {
    //       user: 'academypero@gmail.com',
    //       pass: 'Porsche911?'
    //     }
    //   });

    //   try {
    //     await transporter.sendMail({
    //       from: 'academypero@gmail.com',
    //       to: user.email,
    //       subject: 'Reset Password',
    //       text: `Access the following link to reset your password: ${body.resetURL}/` + jwt.sign({
    //         _id: user._id,
    //       }, config.get('jwtPrivateKey'))
    //     });
    //   } catch (e) {
    //     return false;
    //   }

    //   return true;
    // }

    return false;
  }
}
