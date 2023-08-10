import * as Joi from 'joi';

export const signInSchema = Joi.object().keys({
  username: Joi.string().min(6).max(16).required(),
  password: Joi.string().min(6).max(16).required(),
});

export const signUpSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  username: Joi.string().min(6).max(16).required(),
  password: Joi.string().min(6).max(16).required(),
});
