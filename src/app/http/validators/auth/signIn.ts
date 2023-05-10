import * as Joi from 'joi';

export const signInBySocialSchema = Joi.object().keys({
  providerAccessToken: Joi.string().required(),
  providerName: Joi.valid('MICROSOFT', 'GOOGLE').required(),
});

export const signInByEmailSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  redirectUrl: Joi.string(),
});

export const signInByEmailCallbackSchema = Joi.object().keys({
  token: Joi.string().required(),
  redirectUrl: Joi.string().required(),
});
