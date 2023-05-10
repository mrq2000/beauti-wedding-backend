import fs = require('fs');
import { promisify } from 'util';

export const unlinkAsync = promisify(fs.unlink);

export const getDomain = (host: string): string => {
  return host.split('.')[0];
};

export const getAllValuesEnum = (enumVar: any): any[] => {
  const keysAndValues = Object.values(enumVar);
  const values = [];

  keysAndValues.forEach((keyOrValue: any) => {
    if (isNaN(Number(keyOrValue))) {
      values.push(enumVar[keyOrValue] || keyOrValue);
    }
  });

  return values;
};
