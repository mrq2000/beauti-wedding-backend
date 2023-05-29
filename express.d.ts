import { Request } from 'express';
import User from '../../entities/User';
import Design from '../../entities/Design';

declare module 'express-serve-static-core' {
  export interface Request {
    user: User;
    isOwner: boolean;
    design: Design;
  }
}
