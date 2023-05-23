import { getRepository } from 'typeorm';

import { TemplateStatus } from './../../enums/template';
import Template from '../../entities/Template';

interface IGetTemplate {
  offset: number;
  limit: number;
}

export const getTemplate = async ({ offset, limit }: IGetTemplate) => {
  const templates = await getRepository(Template)
    .createQueryBuilder()
    .where('status = :status', { status: TemplateStatus.ACTIVE })
    .offset(offset)
    .limit(limit)
    .orderBy('id', 'DESC')
    .select(['id', 'preview_img_url'])
    .execute();

  return templates;
};