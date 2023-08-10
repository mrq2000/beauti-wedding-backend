import { TemplateStatus } from './../../enums/template';
import { Request, Response } from 'express';

import * as templateService from '../services/template';
import { APP, Get } from '../../helpers/decorator';
import { validate } from '../../helpers/validate';
import * as templateSchema from '../validators/template';
import { abort } from '../../helpers/error';
import { isTemplate } from '../middlewares/template';

@APP('/templates')
export default class Templates {
  @Get('/')
  async getTemplates(req: Request, res: Response) {
    const params = {
      offset: req.query.offset,
      limit: req.query.limit,
    };

    const formatParams = await validate(templateSchema.getTemplatesSchema, params);
    const responseData = await templateService.getTemplates(formatParams);
    res.status(200).send(responseData);
  }

  @Get('/:templateId', [isTemplate])
  async getTemplate(req: Request, res: Response) {
    const template = req.template;
    if (template.status !== TemplateStatus.ACTIVE) {
      abort(400, 'Template is not available now!');
    }
    res.status(200).send(template);
  }
}
