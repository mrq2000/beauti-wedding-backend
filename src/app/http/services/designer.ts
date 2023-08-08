import { getRepository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { abort } from '../../helpers/error';
import * as jwt from '../../helpers/jwt';
import { DesignerStatus } from '../../enums/designer';
import Designer from '../../entities/Designer';
import Template from '../../entities/Template';

interface ISignIn {
  username: string;
  password: string;
}

export const signIn = async ({ username, password }: ISignIn) => {
  const designer = await getRepository(Designer)
    .createQueryBuilder()
    .select('*')
    .where('username = :username', { username })
    .getRawOne();
  if (!designer || !bcrypt.compareSync(password, designer.password)) {
    abort(400, 'Tài khoản hoặc mật khẩu không chính xác!');
  }

  if (designer.status == DesignerStatus.INACTIVE) {
    abort(403, 'Tài khoản đã bị khóa');
  }

  const accessToken = jwt.generate({ designerId: designer.id }, 60 * 60 * 24);
  return { accessToken };
};

export const getDesigner = async (id: number) => {
  const designer = await getRepository(Designer).findOne(id);
  return designer;
};

export const changePassword = async (password: string, id: number) => {
  const designer = await getRepository(Designer).findOne(id);
  if (!designer) {
    abort(404, 'Không tìm thấy Desiger!');
  }

  if (password.length < 6 || password.length > 16) {
    abort(400, 'Password không hợp lệ');
  }

  await getRepository(Designer)
    .createQueryBuilder()
    .where('id = :id', { id })
    .update({
      password: bcrypt.hashSync(password),
    })
    .execute();
};

export const getTemplates = async (id: number) => {
  const templates = await getRepository(Template).find({
    where: {
      designerId: id,
    },
    order: {
      updated_at: 'DESC',
    },
  });

  return templates;
};
