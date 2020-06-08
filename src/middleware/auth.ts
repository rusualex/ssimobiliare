import config from 'config';
import * as jwt from 'jsonwebtoken';
import { Context, Next } from 'koa';
import { userService, responseWrapperService } from '../index';
import { IUser } from '../model/user.model';

export async function auth(ctx: Context, next: Next): Promise<void> {
  const token: string = ctx.get('x-auth-token');

  if (!token && !token.trim()) {
    ctx.status = 401;
    ctx.body = responseWrapperService.wrapException({ message: 'Access denied. No token provided' })
  } else {
    try {
      const id: string | any = jwt.verify(token, config.get('jwtPrivateKey'));
      let user: IUser;
      if (typeof id === "string")
        user = await userService.getUserById(id);
      else
        user = await userService.getUserById(id._id);
      console.log(user);
      if (user) {
        await next();
      } else {
        ctx.status = 400;
        ctx.body = 'Invalid token.';
      }
    } catch (e) {
      ctx.status = 400;
      ctx.body = 'Invalid token.';
    }
  }
}
