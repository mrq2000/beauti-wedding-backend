import { Request, Response, NextFunction } from 'express';

import * as jwt from '../../helpers/jwt';

async function checkAdmin(req: Request) {
  const authorization = `${req.headers.admin_authorization || ''}`;
  if (authorization === '') return false;
  if (!authorization.startsWith('Bearer ')) return false;
  const token = authorization.slice(7, authorization.length);
  const payload = jwt.parse(token);

  if (payload === false || !payload.isAdmin) return false;
  return true;
}

async function authAdmin(req: Request, res: Response, next: NextFunction): Promise<any> {
  const isAdmin = await checkAdmin(req);

  if (!isAdmin) {
    return res.status(401).send({
      message: 'Bạn Không Phải Là Admin',
    });
  }

  req['isAdmin'] = isAdmin;

  return next();
}

export default authAdmin;
