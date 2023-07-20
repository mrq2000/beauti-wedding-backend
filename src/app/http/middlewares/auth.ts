import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { UserStatus } from '../../enums/user';
import * as jwt from '../../helpers/jwt';
import User from '../../entities/User';

async function getUser(req: Request) {
  const userRepository = getRepository(User);
  const authorization = req.headers.authorization || '';
  if (authorization === '') return false;
  if (!authorization.startsWith('Bearer ')) return false;
  const token = authorization.slice(7, authorization.length);
  const payload = jwt.parse(token);

  if (payload === false || !payload.userId) return false;
  const user = await userRepository.findOne(payload.userId);

  if (!user) return false;
  return user;
}

async function auth(req: Request, res: Response, next: NextFunction): Promise<any> {
  const user = await getUser(req);

  if (!user) {
    return res.status(401).send({
      message: 'You must be logged in',
    });
  }

  if (user.status === UserStatus.INACTIVE) {
    return res.status(401).send({
      message: 'You have been blocked',
    });
  }

  req['user'] = user;
  req['currentDesignId'] = req.headers.current_design_id ? +req.headers.current_design_id : undefined;

  return next();
}

export default auth;
