import { getRepository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { abort } from '../../helpers/error';
import * as jwt from '../../helpers/jwt';
import { UserStatus } from '../../enums/user';

import User from '../../entities/User';

interface ISignIn {
  username: string;
  password: string;
}

export const signIn = async ({ username, password }: ISignIn) => {
  const user = await getRepository(User)
    .createQueryBuilder()
    .select('*')
    .where('username = :username', { username })
    .getRawOne();
  if (!user || !bcrypt.compareSync(password, user.password)) {
    abort(400, 'Tài khoản hoặc mật khẩu không chính xác!');
  }

  if (user.status == UserStatus.INACTIVE) {
    abort(403, 'Tài khoản đã bị khóa');
  }

  const accessToken = jwt.generate({ userId: user.id });
  return { accessToken };
};

interface ISignUp {
  username: string;
  password: string;
  email: string;
}

export const signUp = async ({ username, password, email }: ISignUp) => {
  const user = await getRepository(User).findOne({ username });
  if (user) {
    abort(404, 'Username đã được sử dụng!');
  }

  const userInfo = await getRepository(User)
    .createQueryBuilder()
    .insert()
    .values({
      username,
      password: bcrypt.hashSync(password),
      email,
    })
    .execute();

  const accessToken = jwt.generate({ userId: userInfo.raw.insertId });
  return { accessToken };
};
