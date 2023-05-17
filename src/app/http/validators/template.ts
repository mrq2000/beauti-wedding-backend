import * as Joi from 'joi';

export const getTemplateSchema = Joi.object().keys({
  offset: Joi.number().required(),
  limit: Joi.number().required(),
});
