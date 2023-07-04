import { abort } from '../../helpers/error';
import { getRepository } from 'typeorm';
import Design from '../../entities/Design';

export const getLiveDesign = async (domain: string, inviteeId: string) => {
  const design = await getRepository(Design).findOne({
    where: { domain },
    relations: ['designPublic'],
  });

  if (!design) {
    abort(401, 'Link không hợp lệ. Vui lòng kiểm tra lại đường dẫn!');
  }
  const receivers = JSON.parse(design.receivers);
  const name = receivers.find((receiver) => receiver.id == inviteeId)?.name;

  if (!name) {
    abort(401, 'Link không hợp lệ. Vui lòng kiểm tra lại đường dẫn!');
  }
  return {
    design,
    name,
  };
};
