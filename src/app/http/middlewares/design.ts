import { Request, Response, NextFunction } from 'express';

import { getDesignInfo } from '../services/design';

export async function isDesign(req: Request, res: Response, next: NextFunction): Promise<any> {
  const designId = +req.params.id;
  const design = await getDesignInfo({ designId });
  if (!design) {
    return res.status(400).send({
      message: 'Design not found!',
    });
  }

  req['design'] = design;
  return next();
}

export async function isOwner(req: Request, res: Response, next: NextFunction): Promise<any> {
  const user = req.user;
  const design = req.design;
  if (design.user_id !== user.id) {
    return res.status(403).send({
      message: 'You are not owner of this design!',
    });
  }

  return next();
}
