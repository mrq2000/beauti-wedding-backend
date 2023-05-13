import * as Joi from 'joi';

export const signInSchema = Joi.object().keys({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

export const signUpSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
});
