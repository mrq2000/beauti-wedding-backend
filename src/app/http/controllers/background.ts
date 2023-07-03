import { Request, Response } from 'express';

import * as backgroundService from '../services/background';
import { APP, Get } from '../../helpers/decorator';
import auth from '../middlewares/auth';

@APP('/backgrounds', [auth])
export default class Background {
  @Get('/')
  async getBackgrounds(req: Request, res: Response) {
    const responseData = await backgroundService.getBackgrounds();
    res.status(200).send(responseData);
  }
}
