import { Request, Response } from 'express';

import * as templateService from '../services/template';
import { APP, Get } from '../../helpers/decorator';
import { validate } from '../../helpers/validate';
import * as templateSchema from '../validators/template';

@APP('/templates')
export default class Templates {
  @Get('/')
  async getTemplates(req: Request, res: Response) {
    const params = {
      offset: req.params.offset,
      limit: req.params.limit,
    };

    const formatParams = await validate(templateSchema.getTemplateSchema, params);
    const responseData = await templateService.getTemplate(formatParams);
    res.status(200).send(responseData);
  }
}
