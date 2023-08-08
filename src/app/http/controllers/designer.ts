import { Request, Response } from 'express';
import { APP, Get, Post } from '../../helpers/decorator';
import authDesigner from '../middlewares/designer';
import { validate } from '../../helpers/validate';
import * as authSchema from '../validators/auth';
import * as designerService from '../services/designer';

@APP('/designers')
export default class Designers {
  @Get('/me', [authDesigner])
  async me(req: Request, res: Response) {
    const me = req.designer;
    res.status(200).send(me);
  }

  @Post('/sign-in')
  async signIn(req: Request, res: Response) {
    const params = {
      username: req.body.username,
      password: req.body.password,
    };

    const formatParams = await validate(authSchema.signInSchema, params);
    const responseData = await designerService.signIn(formatParams);
    res.status(200).send(responseData);
  }

  @Post('/change-password')
  async changePassword(req: Request, res: Response) {
    const me = req.designer;
    const password = req.body.password;

    const responseData = await designerService.changePassword(password, me.id);
    res.status(200).send(responseData);
  }

  @Get('/templates', [authDesigner])
  async getTemplates(req: Request, res: Response) {
    const me = req.designer;
    const templates = await designerService.getTemplates(me.id);
    res.status(200).send(templates);
  }
}
