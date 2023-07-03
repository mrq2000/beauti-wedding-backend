import { getRepository } from 'typeorm';

import Background from '../../entities/Background';

export const getBackgrounds = async () => {
  const backgrounds = await getRepository(Background).find();

  return backgrounds;
};
