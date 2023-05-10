import * as Joi from 'joi';
import { abort } from './error';

export const validate = async (schema: Joi.ObjectSchema<any>, data: any, message?: string): Promise<any> => {
  try {
    const res = await schema.validateAsync(data);
    return res;
  } catch (error) {
    abort(400, message || error);
  }
};
