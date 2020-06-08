import { User } from './../model/user.model';
import config from 'config';
import * as jwt from 'jsonwebtoken';
import { Context } from 'koa';
import Router from 'koa-router';
import { responseWrapperService, userService, idMapper } from '../index';
import { IMongoResponse } from '../model/mongo-response.model';
import { INewPassword } from '../model/new-password.model';
import { IUser } from '../model/user.model';
import { auth } from '../middleware/auth';

export class UserRouter {
  getRouter(): Router {
    const router: Router = new Router();

    router.get('/', async (ctx: Context) => {
      try {
        const userResponse: IUser[] = await userService.getUsers();
        if (userResponse) {
          ctx.status = 200;
          ctx.body = responseWrapperService.wrapOk(await idMapper.remapModels(userResponse));
        }
        else {
          ctx.status = 204;
          ctx.body = responseWrapperService.wrapOk(userResponse);
        }
      } catch (e) {
        ctx.status = 500;
        ctx.body = responseWrapperService.wrapException(e);
      }
    });

    router.get('/:id', async (ctx: Context) => {
      try {
        const userId: string = ctx.params.id;
        const userResponse: IUser = await userService.getUserById(userId);
        if (userResponse) {
          ctx.status = 200;
          const etc: any = userResponse;
          ctx.body = responseWrapperService.wrapOk(await idMapper.remapModel(userResponse));
        }
        else {
          ctx.status = 204;
          ctx.body = responseWrapperService.wrapOk(null);
        }
      } catch (e) {
        ctx.status = 500;
        ctx.body = responseWrapperService.wrapException(e);
      }
    });

    router.get('/:username', async (ctx: Context) => {
      try {
        const username: string = ctx.params.username;
        const userResponse: IUser = await userService.getUserByusername(username);
        if (userResponse) {
          ctx.status = 200;
          ctx.body = responseWrapperService.wrapOk(await idMapper.remapModel(userResponse));
        }
        else {
          ctx.status = 204;
          ctx.body = responseWrapperService.wrapOk(userResponse);
        }
      } catch (e) {
        ctx.status = 500;
        ctx.body = responseWrapperService.wrapException(e);
      }
    });

    router.post('/', async (ctx: Context) => {
      try {
        const userResponse: IUser = await userService.saveUser(ctx.request.body);
        if (userResponse) {
          ctx.status = 201;
          ctx.body = responseWrapperService.wrapOk(await idMapper.remapModel(userResponse));
        } else {
          ctx.status = 200;
          ctx.body = responseWrapperService.wrapOk(userResponse);
        }
      } catch (e) {
        ctx.status = 500;
        ctx.body = responseWrapperService.wrapException(e);
      }
    });

    router.put('/', async (ctx: Context) => {
      try {
        const userResponse: IMongoResponse = await userService.updateUser(ctx.request.body);
        ctx.status = 200;
        ctx.body = responseWrapperService.wrapOk(userResponse.nModified);
      } catch (e) {
        ctx.status = 500;
        ctx.body = responseWrapperService.wrapException(e);
      }
    });

    router.delete('/:id', async (ctx: Context) => {
      try {
        const userId: string = ctx.params.id;
        const userResponse: IMongoResponse = await userService.deleteUserById(userId);
        ctx.status = 200;
        ctx.body = responseWrapperService.wrapOk(userResponse.nDeleted);
      } catch (e) {
        ctx.status = 500;
        ctx.body = responseWrapperService.wrapException(e);
      }
    });

    router.post('/reset-password', async (ctx: Context) => {
      try {
        const token: string = ctx.get('x-auth-token');

        if (!token && !token.trim()) {
          ctx.status = 401;
          ctx.body = 'Access denied. No token provided';
        } else {
          await this.tryPasswordChange(ctx, token);
        }
      } catch (e) {
        ctx.status = 500;
        ctx.body = responseWrapperService.wrapException(e);
      }
    });

    return router;
  }

  private async tryPasswordChange(ctx: Context, token: string): Promise<void> {
    try {
      const userData: any = jwt.verify(token, config.get('jwtPrivateKey'));
      const user: IUser = await userService.getUserById(userData._id);
      const newPassword: INewPassword = ctx.request.body;

      if (user) {
        if (newPassword.password === newPassword.passwordConfirmation) {
          user.encrypted_password = newPassword.password;
          const response: IMongoResponse = await userService.updateUser(user);
          ctx.status = 200;
          ctx.body = responseWrapperService.wrapOk(response);
        } else {
          ctx.status = 400;
          ctx.body = 'Password and password confirmation do not match.';
        }
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
