import * as config from 'config';
import * as jwt from 'jsonwebtoken';
import { Context, Next } from 'koa';
import { userService, responseWrapperService } from '../index';
import { IUser } from '../model/user.model';

export async function auth(ctx: Context, next: Next): Promise<void> {
  const token: string = ctx.get('x-auth-token');

  if (!token && !token.trim()) {
    ctx.status = 401;
    ctx.body = responseWrapperService.wrapException('Access denied. No token provided')
  } else {
    try {
      const id: string | any = jwt.verify(token, config.get('jwtPrivateKey'));
      const user: IUser = await userService.getUserById(id);

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
