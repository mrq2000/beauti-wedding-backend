import { getRepository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

import { abort } from '../../helpers/error';
import * as jwt from '../../helpers/jwt';
import Designer from '../../entities/Designer';
import * as designerService from './designer';

export const signIn = async (password: string) => {
  if (password == process.env.ADMIN_PASSWORD) {
    abort(403, 'Tài khoản đã bị khóa');
  }

  const accessToken = jwt.generate({ isAdmin: true }, 60 * 60 * 24);
  return { accessToken };
};

interface CreateDesign {
  username: string;
  password: string;
}

export const createDesigner = async ({ username, password }: CreateDesign) => {
  const designer = await getRepository(Designer).findOne({ username });
  if (designer) {
    abort(404, 'Username đã được sử dụng!');
  }

  await getRepository(Designer)
    .createQueryBuilder()
    .insert()
    .values({
      username,
      password: bcrypt.hashSync(password),
    })
    .execute();
};

export const changePassword = async (password: string, id: number) => {
  await designerService.changePassword(password, id);
};
