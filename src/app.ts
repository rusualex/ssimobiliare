import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from 'koa-cors';
import Router from 'koa-router';
import mongoose from 'mongoose';
import { parentRouter } from './';
import { admin } from './middleware/admin';
import { auth } from './middleware/auth';
import config from 'config';


(async () => {
  const port: number = config.get('PORT');
  const app: Koa = new Koa();
  const router: Router = new Router().use(parentRouter.getRouter().routes());
  const dbURL: string = process.env.MONGODB_URI || config.get("MONGODB_URI");
  console.log('db', dbURL);


  app.use(cors());
  app.use(bodyParser());
  app.use(router.routes());
  app.use(auth);
  app.use(admin);
  app.listen(process.env.PORT || port);
  mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
    // tslint:disable-next-line: no-console
    .then(() => console.log('** Connected to MongoDB **'))
    // tslint:disable-next-line: no-console
    .catch((err: Error) => console.error('** Could not connect to MongoDB **', err));

    // tslint:disable-next-line: no-console
  console.log(`** App running on port ${port} **`);
})();

