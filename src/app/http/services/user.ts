import { getRepository } from 'typeorm';
import { abort } from '../../helpers/error';

import User from '../../entities/User';

interface IGetUserInfo {
  userId: number;
}

export const getUserInfo = async ({ userId }: IGetUserInfo) => {
  const user = await getRepository(User).findOne(userId);

  if (!user) {
    abort(404, 'Account not found');
  }

  return user;
};
