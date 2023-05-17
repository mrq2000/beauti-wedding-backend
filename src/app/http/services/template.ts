import { getRepository } from 'typeorm';

import Template from '../../entities/Template';

interface IGetTemplate {
  offset: number;
  limit: number;
}

export const getTemplate = async ({ offset, limit }: IGetTemplate) => {
  const templates = await getRepository(Template)
    .createQueryBuilder()
    .offset(offset)
    .limit(limit)
    .orderBy('id', 'DESC')
    .execute();

  return templates;
};
