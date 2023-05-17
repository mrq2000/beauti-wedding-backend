import { getRepository } from 'typeorm';

import DesignDraft from '../../entities/DesignDraft';

interface IGetDesignDraft {
  userId: number;
}

export const getDesignDraft = async ({ userId }: IGetDesignDraft) => {
  const designDraft = await getRepository(DesignDraft).findOne(userId);

  return designDraft;
};
