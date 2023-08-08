import { Request, Response } from 'express';

import * as adminService from '../services/admin';
import { APP, Get, Post } from '../../helpers/decorator';
import authAdmin from '../middlewares/admin';
import { isDesigner } from '../middlewares/designer';

@APP('/admin')
export default class Admin {
  @Post('/designers', [authAdmin])
  async createDesigner(req: Request, res: Response) {
    const params = {
      username: req.body.username,
      password: req.body.password,
    };

    adminService.createDesigner(params);
    res.status(200).send({
      message: 'success',
    });
  }

  @Post('/designers/:designerId/change-password', [authAdmin, isDesigner])
  async changePassword(req: Request, res: Response) {
    const password = req.body.password;
    const designerId = +req.params.designerId;

    adminService.changePassword(password, designerId);
    res.status(200).send({
      message: 'success',
    });
  }

  @Post('/sign-in')
  async signIn(req: Request, res: Response) {
    const password = `${req.body.password}`;

    const responseData = await adminService.signIn(password);
    res.status(200).send(responseData);
  }
}
