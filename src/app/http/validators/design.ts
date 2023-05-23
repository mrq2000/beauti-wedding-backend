import * as Joi from 'joi';

export const getDesignDraft = Joi.object().keys({
  userId: Joi.number().required(),
});

export const checkExistDomain = Joi.object().keys({
  domain: Joi.string().required(),
});
