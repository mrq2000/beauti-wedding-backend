import * as Joi from 'joi';

export const updateAvatar = Joi.object().keys({
  userId: Joi.number().integer().required(),
  avatar_bucket: Joi.string().max(63).required(),
  avatar_name: Joi.string().max(256).required(),
  avatar_url: Joi.string().max(1023).required(),
});

export const updateInfo = Joi.object().keys({
  userId: Joi.number().integer().required(),
  fullName: Joi.string().required(),
});
