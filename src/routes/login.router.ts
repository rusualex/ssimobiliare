import { Context } from 'koa';
import Router from 'koa-router';
import { loginService, responseWrapperService, idMapper } from '../index';
import { IAuth } from '../model/auth.model';
import { IResetBody } from '../model/reset.model';
import { IUser } from '../model/user.model';

export class LoginRouter {
  getRouter(): Router {
    const router: Router = new Router();

    router.post('/', async (ctx: Context) => {
      try {
        const auth = await loginService.login(ctx.request.body.username, ctx.request.body.encrypted_password);
        if (auth) {
          ctx.status = 200;
          ctx.body = responseWrapperService.wrapOk(await idMapper.remapModel(auth));
        }
        else {
          ctx.status = 401;
          ctx.body = responseWrapperService.wrapException({ message: 'Invalid user or pass' });
        };
      } catch (e) {
        ctx.status = 500;
        ctx.body = responseWrapperService.wrapException(e);
      }
    });

    router.post('/forgot-password', async (ctx: Context) => {
      try {
        const body: IResetBody = ctx.request.body;
        const userExists: boolean = await loginService.resetPassword(body);
        if (userExists) {
          ctx.status = 200;
          ctx.body = responseWrapperService.wrapOk('Reset password email sent.');
        } else {
          ctx.status = 404;
          ctx.body = responseWrapperService.wrapException('User not found.');
        }
      } catch (e) {
        ctx.status = 500;
        ctx.body = responseWrapperService.wrapException(e);
      }
    });

    return router;
  }
}
