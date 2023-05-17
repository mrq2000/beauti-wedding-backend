import { Request, Response } from 'express';

import * as authService from '../services/auth';
import { APP, Get, Post } from '../../helpers/decorator';
import { validate } from '../../helpers/validate';
import * as authSchema from '../validators/auth';
import auth from '../middlewares/auth';

@APP('/auth')
export default class Auth {
  @Get('/me', [auth])
  async me(req: Request, res: Response) {
    const user = req.user;
    res.status(200).send(user);
  }

  @Post('/sign-in')
  async signIn(req: Request, res: Response) {
    const params = {
      username: req.body.username,
      password: req.body.password,
    };

    const formatParams = await validate(authSchema.signInSchema, params);
    const responseData = await authService.signIn(formatParams);
    res.status(200).send(responseData);
  }

  @Post('/sign-up')
  async signUp(req: Request, res: Response) {
    const params = {
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
    };

    const formatParams = await validate(authSchema.signUpSchema, params);

    const responseData = await authService.signUp(formatParams);
    res.status(200).send(responseData);
  }
}
