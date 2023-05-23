import { Request, Response } from 'express';

import * as designService from '../services/design';
import { APP, Get, Post } from '../../helpers/decorator';
import { validate } from '../../helpers/validate';
import * as designSchema from '../validators/design';
import auth from '../middlewares/auth';

@APP('/designs', [auth])
export default class Designs {
  @Get('/check-domain')
  async checkExistDomain(req: Request, res: Response) {
    const params = {
      domain: req.params.domain,
    };

    const formatParams = await validate(designSchema.checkExistDomain, params);
    const responseData = await designService.checkExistDomain(formatParams);
    res.status(200).send(responseData);
  }

  @Post('/')
  async createDesign(req: Request, res: Response) {
    const params = {
      userId: req.user.id,
    };

    const formatParams = await validate(designSchema.getDesignDraft, params);
    const responseData = await designService.getDesignDraft(formatParams);
    res.status(200).send(responseData);
  }
}
