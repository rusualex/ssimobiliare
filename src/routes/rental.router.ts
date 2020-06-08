import { Context } from 'koa';
import Router from 'koa-router';
import { responseWrapperService, rentalService, idMapper } from '../index';
import { auth } from '../middleware/auth';
import { IMongoResponse } from '../model/mongo-response.model';
import { IRental } from '../model/rental.model';

export class RentalRouter {
  getRouter(): Router {
    const router: Router = new Router();

    router.get('/', async (ctx: Context) => {
      try {
        const filter: object = ctx.request.query;
        const response: IRental[] = await rentalService.getRentals(filter);
        ctx.status = 200;
        ctx.body = responseWrapperService.wrapOk(await idMapper.remapModels(response));
      } catch (e) {
        ctx.status = 500;
        ctx.body = responseWrapperService.wrapException(e);
      }
    });

    router.get('/:id',async (ctx: Context) => {
      try {
        const rentalId: string = ctx.params.id;
        const response: IRental = await rentalService.getRentalById(rentalId);
        ctx.status = 200;
        ctx.body = responseWrapperService.wrapOk(await idMapper.remapModel(response));
      } catch (e) {
        ctx.status = 500;
        ctx.body = responseWrapperService.wrapException(e);
      }
    });

    router.post('/', async (ctx: Context) => {
      try {
        const response: IRental = await rentalService.saveRental(ctx.request.body);
        ctx.status = 200;
        ctx.body = responseWrapperService.wrapOk(await idMapper.remapModel(response));
      } catch (e) {
        ctx.status = 500;
        ctx.body = responseWrapperService.wrapException(e);
      }
    });

    router.put('/', auth, async (ctx: Context) => {
      try {
        const response: IMongoResponse = await rentalService.updateRental(ctx.request.body);
        ctx.status = 200;
        ctx.body = responseWrapperService.wrapOk(response);
      } catch (e) {
        ctx.status = 500;
        ctx.body = responseWrapperService.wrapException(e);
      }
    });

    router.delete('/:id', auth, async (ctx: Context) => {
      try {
        const rentalId: string = ctx.params.id;
        const response: IMongoResponse = await rentalService.deleteRentalById(rentalId);
        ctx.status = 200;
        ctx.body = responseWrapperService.wrapOk(response);
      } catch (e) {
        ctx.status = 500;
        ctx.body = responseWrapperService.wrapException(e);
      }
    });

    return router;
  }
}
