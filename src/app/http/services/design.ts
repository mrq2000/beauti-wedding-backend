import { getManager, getRepository } from 'typeorm';

import Design from '../../entities/Design';
import Template from '../../entities/Template';
import { abort } from '../../helpers/error';
import DesignDraft from '../../entities/DesignDraft';

export const getDesignInfo = async ({ designId }: { designId: number }) => {
  const design = await getRepository(Design).findOne(designId);
  return design;
};

export const getDesignDraft = async ({ designId }: { designId: number }) => {
  const design = await getRepository(DesignDraft).findOne({ design_id: designId });
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

interface ICreateDomain {
  userId: number;
  domain: string;
  templateId: number;
  groomName: string;
  groomMotherName?: string;
  groomFatherName?: string;
  brideName: string;
  brideMotherName?: string;
  brideFatherName?: string;
  location?: string;
  time: string;
}

export const createDesign = async ({
  userId,
  domain,
  templateId,
  groomName,
  groomMotherName,
  groomFatherName,
  brideName,
  brideMotherName,
  brideFatherName,
  location,
  time,
}: ICreateDomain) => {
  const template = await getRepository(Template).findOne(templateId);
  if (!template) abort(400, 'Template not found!');
  let insertId;
  await getManager().transaction(async (transaction) => {
    const designRepository = transaction.getRepository(Design);
    const designDraftRepository = transaction.getRepository(DesignDraft);

    const res = await designRepository.insert({
      user_id: userId,
      domain: domain,
      groom_name: groomName,
      groom_mother_name: groomMotherName,
      groom_farther_name: groomFatherName,
      bride_name: brideName,
      bride_mother_name: brideMotherName,
      bride_farther_name: brideFatherName,
      time,
      location,
      designDraft: {
        template_id: templateId,
        data: template.data,
      },
    });

    insertId = res.raw.insertId;
    await designDraftRepository.insert({
      template_id: templateId,
      data: template.data,
      design_id: insertId,
    });
  });

  return {
    id: insertId,
  };
};
