import { Request, Response } from 'express';

import * as designService from '../services/design';
import { APP, Get } from '../../helpers/decorator';
import { validate } from '../../helpers/validate';
import * as designSchema from '../validators/design';
import auth from '../middlewares/auth';

@APP('/designs', [auth])
export default class Designs {
  @Get('/draft')
  async getDesignDraft(req: Request, res: Response) {
    const params = {
      userId: req.user.id,
    };

    const formatParams = await validate(designSchema.getDesignDraft, params);
    const responseData = await designService.getDesignDraft(formatParams);
    res.status(200).send(responseData);
  }
}
