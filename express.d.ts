import { Request } from 'express';

declare module 'express-serve-static-core' {
  export interface Request {
    user: any;
  }
}
