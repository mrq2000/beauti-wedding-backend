import { Request, Response, NextFunction } from 'express';
import { getTemplate } from '../services/template';

export async function isTemplate(req: Request, res: Response, next: NextFunction): Promise<any> {
  const templateId = +req.params.templateId;
  const template = await getTemplate(templateId);
  if (!template) {
    return res.status(400).send({
      message: 'Template not found!',
    });
  }

  req['template'] = template;
  return next();
}
