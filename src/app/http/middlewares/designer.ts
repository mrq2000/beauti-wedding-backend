import { getDesigner as getDesignerInfo } from './../services/designer';
import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { DesignerStatus } from '../../enums/designer';
import * as jwt from '../../helpers/jwt';
import Designer from '../../entities/Designer';
import Template from '../../entities/Template';

async function getDesigner(req: Request) {
  const designerRepository = getRepository(Designer);
  const designer_authorization = `${req.headers.designer_authorization || ''}`;
  if (designer_authorization === '') return false;
  if (!designer_authorization.startsWith('Bearer ')) return false;
  const token = designer_authorization.slice(7, designer_authorization.length);
  const payload = jwt.parse(token);

  if (payload === false || !payload.designerId) return false;
  const designer = await designerRepository.findOne(payload.designerId);

  if (!designer) return false;
  return designer;
}

async function authDesigner(req: Request, res: Response, next: NextFunction): Promise<any> {
  const designer = await getDesigner(req);

  if (!designer) {
    return res.status(401).send({
      message: 'Bạn chưa đăng nhập',
    });
  }

  if (designer.status === DesignerStatus.INACTIVE) {
    return res.status(401).send({
      message: 'Tài khoản của bạn đã bị khóa!',
    });
  }

  req['designer'] = designer;
  req['currentTemplateId'] = req.headers.current_template_id ? +req.headers.current_template_id : undefined;

  return next();
}

export async function isDesigner(req: Request, res: Response, next: NextFunction): Promise<any> {
  const designerId = +req.params.designerId;
  const designer = await getDesignerInfo(designerId);
  if (!designer) {
    return res.status(400).send({
      message: 'Designer not found!',
    });
  }

  req['designer'] = designer;
  return next();
}

export async function isOwnerTemplate(req: Request, res: Response, next: NextFunction): Promise<any> {
  const designer = req['designer'] as Designer;
  const template = req['template'] as Template;

  if (template.designerId !== designer.id) {
    return res.status(400).send({
      message: 'You are not owner of this template!',
    });
  }

  return next();
}

export default authDesigner;
