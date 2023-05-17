import * as Joi from 'joi';

export const getDesignDraft = Joi.object().keys({
  userId: Joi.number().required(),
});
