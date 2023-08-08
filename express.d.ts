import { Request } from 'express';
import User from '../../entities/User';
import Designer from '../../entities/Designer';
import Design from '../../entities/Design';
import Template from '../../entities/Template';

declare module 'express-serve-static-core' {
  export interface Request {
    user: User;
    designer: Designer;
    isOwner: boolean;
    isAdmin: boolean;
    design: Design;
    template: Template;
    currentDesignId?: number;
    currentTemplateId?: number;
  }
}
