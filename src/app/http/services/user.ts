import { getRepository } from 'typeorm';
import bcrypt from 'bcryptjs';
import { abort } from '../../helpers/error';
import * as jwt from '../../helpers/jwt';
import { UserStatus } from '../../enums/user';

import User from '../../entities/User';

interface IGetUserInfo {
  userId: number;
}

export const getUserInfo = async ({ userId }: IGetUserInfo) => {
  const user = await getRepository(User)
    .createQueryBuilder('user')
    .where({ id: userId })
    .innerJoinAndSelect('user.design', 'design')
    .execute();

  if (!user) {
    abort(404, 'Account not found');
  }

  return user;
};
