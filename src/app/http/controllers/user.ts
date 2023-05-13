import { Request, Response } from 'express';

import * as authService from '../services/user';
import { APP, Get, Post } from '../../helpers/decorator';
import auth from '../middlewares/auth';

@APP('/me', [auth])
export default class User {
  @Get('/')
  async me(req: Request, res: Response): Promise<void> {
    const responseData = await authService.getUserInfo(req.user.id);
    res.status(200).send(responseData);
  }
}
