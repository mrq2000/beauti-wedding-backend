import * as Joi from 'joi';

export const getTemplatesSchema = Joi.object().keys({
  offset: Joi.number().required(),
  limit: Joi.number().required(),
});
