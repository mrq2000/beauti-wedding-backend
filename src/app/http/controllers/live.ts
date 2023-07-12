import { Request, Response } from 'express';

import * as liveService from '../services/live';
import { APP, Get } from '../../helpers/decorator';

@APP('/live')
export default class Live {
  @Get('/:domain/:inviteeId')
  async getTemplates(req: Request, res: Response) {
    const domain = `${req.params.domain}`;
    const inviteeId = `${req.params.inviteeId}`;
    const responseData = await liveService.getLiveDesign(domain, inviteeId);

    res.status(200).send(responseData);
  }

  @Get('/hello')
  async hello(req: Request, res: Response) {
    res.status(200).send({
      message: 'hello',
    });
  }
}
