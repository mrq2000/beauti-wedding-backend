import { getRepository } from 'typeorm';

import Design from '../../entities/Design';
import DesignDraft from '../../entities/DesignDraft';

interface IGetDesignDraft {
  userId: number;
}

export const getDesignDraft = async ({ userId }: IGetDesignDraft) => {
  const designDraft = await getRepository(DesignDraft).findOne(userId);

  return designDraft;
};

interface ICheckExistDomain {
  domain: string;
}

export const checkExistDomain = async ({ domain }: ICheckExistDomain) => {
  const design = await getRepository(Design).findOne({ where: { domain } });

  return {
    isExist: !!design,
  };
};
