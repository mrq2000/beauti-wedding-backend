import * as Joi from 'joi';

export const createDesign = Joi.object().keys({
  userId: Joi.number().required(),
  domain: Joi.string().required(),
  templateId: Joi.number().required(),
  groomName: Joi.string().max(30).required(),
  groomMotherName: Joi.string().max(30).allow(''),
  groomFatherName: Joi.string().max(30).allow(''),
  brideName: Joi.string().max(30).required(),
  brideMotherName: Joi.string().max(30).allow(''),
  brideFatherName: Joi.string().max(30).allow(''),
  location: Joi.string().max(200).required(),
  time: Joi.string().required(),
});

export const checkExistDomain = Joi.object().keys({
  domain: Joi.string().required(),
});
