import { LoginRouter } from './routes/login.router';
import { ParentRouter } from './routes/parent.router';
import { RentalRouter } from './routes/rental.router';
import { UserRouter } from './routes/user.router';
import { HashService } from './services/hash.service';
import { LoginService } from './services/login.service';
import { ResponseWrapperService } from './services/response-wrapper.service';
import { RentalService } from './services/rental.service';
import { UserService } from './services/user.service';
import * as ampq from 'amqplib/callback_api';

const parentRouter: ParentRouter = new ParentRouter();
const userRouter: UserRouter = new UserRouter();
const rentalRouter: RentalRouter = new RentalRouter();
const loginRouter: LoginRouter = new LoginRouter();
const userService: UserService = new UserService();
const rentalService: RentalService = new RentalService();
const responseWrapperService: ResponseWrapperService = new ResponseWrapperService();
const hashService: HashService = new HashService();
const loginService: LoginService = new LoginService();

// if (!config.get('jwtPrivateKey')) {
//   console.error('FATAL ERROR: jwtPrivateKey is not defined');
//   process.exit(1);
// }

export {
  parentRouter,
  userRouter,
  rentalRouter,
  loginRouter,
  userService,
  rentalService,
  responseWrapperService,
  loginService,
  hashService,
  ampq
};