import { getManager, getRepository } from 'typeorm';

import Design from '../../entities/Design';
import Template from '../../entities/Template';
import { abort } from '../../helpers/error';
import DesignDraft from '../../entities/DesignDraft';
import { UserInfo } from 'app/interface/design';

export const getDesigns = async (userId: number) => {
  const designs = await getRepository(Design).find({
    where: { userId },
    relations: ['designPublic'],
    order: {
      updated_at: 'DESC',
    },
  });
  return designs.map((design) => ({ ...design, designPublic: !!design.designPublic }));
};

export const getDesignInfo = async (designId: number) => {
  const design = await getRepository(Design).findOne({
    where: { id: designId },
    relations: ['designPublic'],
  });
  return { ...design, designPublic: !!design.designPublic };
};

export const getDesignDraft = async ({ designId }: { designId: number }) => {
  const design = await getRepository(DesignDraft).findOne({ designId });
  return design;
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

interface ICreateDomain extends UserInfo {
  userId: number;
  domain: string;
  templateId: number;
}

export const createDesign = async ({ templateId, ...insertData }: ICreateDomain) => {
  const template = await getRepository(Template).findOne(templateId);
  if (!template) abort(400, 'Template not found!');
  let insertId;
  await getManager().transaction(async (transaction) => {
    const designRepository = transaction.getRepository(Design);
    const designDraftRepository = transaction.getRepository(DesignDraft);

    const res = await designRepository.insert({
      ...insertData,
      previewImgUrl: template.previewImgUrl,
      designDraft: {
        data: template.data,
        animation: template.animation,
        backgroundImg: template.backgroundImg,
      },
    });

    insertId = res.raw.insertId;
    await designDraftRepository.insert({
      data: template.data,
      designId: insertId,
    });
  });

  getRepository(Template)
    .createQueryBuilder()
    .where('id = :templateId', { templateId })
    .update()
    .set({ usingCount: () => 'using_count + 1' })
    .execute();

  return {
    id: insertId,
  };
};

export const updateDraftDesignData = async ({ designId, data }: { designId: number; data: string }) => {
  await getRepository(DesignDraft)
    .createQueryBuilder()
    .where('design_id = :designId', { designId })
    .update({
      data,
    })
    .execute();
};

export const updateDesignDraftAnimation = async (animation: string, designId: number) => {
  await getRepository(DesignDraft)
    .createQueryBuilder()
    .where('design_id = :designId', { designId })
    .update({
      animation,
    })
    .execute();
};

export const updateDesignDraftBackground = async (backgroundImg: string, designId: number) => {
  await getRepository(DesignDraft)
    .createQueryBuilder()
    .where('design_id = :designId', { designId })
    .update({
      backgroundImg,
    })
    .execute();
};

export const updateDesignUserInfo = async (userInfo: UserInfo, designId: number) => {
  await getRepository(Design).createQueryBuilder().where('id = :designId', { designId }).update(userInfo).execute();
};

export const updateDesignReceivers = async (designId: number, receivers: string) => {
  await getRepository(Design)
    .createQueryBuilder()
    .where('id = :designId', { designId })
    .update({
      receivers,
    })
    .execute();
};
