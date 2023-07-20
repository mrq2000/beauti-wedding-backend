import * as multer from 'multer';
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import * as sharp from 'sharp';

import { DesignPlan } from './../../enums/design';
import { uploadS3, uploadServer } from '../../helpers/upload';
import { s3 } from '../../helpers/s3';
import User from '../../entities/User';
import { getDesignInfo } from '../services/design';

const DEFAULT_MAX_SIZE_IMAGE = 1024 * 1024; // 1 MB;
const DEFAULT_MAX_SIZE_VIDEO = 1024 * 1024 * 1024; // 1 GB;
const DEFAULT_MAX_SIZE_RESOURCE = 1024 * 1024 * 10; // 10MB

const checkImage = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const fileTypes = /jpeg|jpg|png|gif$/;
  const extname = fileTypes.test(file.mimetype);
  if (extname) {
    return cb(null, true);
  }
  return cb(new Error('Error: Please make sure your image type is 1 of jpeg, jpg, png'));
};

const checkResource = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const fileTypes = /pdf$/;
  const extname = fileTypes.test(file.mimetype);
  if (extname) {
    return cb(null, true);
  }
  return cb(new Error('Error: Please make sure your resource type is pdf'));
};

const checkVideo = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (/^video\/.*$/.test(file.mimetype)) {
    return cb(null, true);
  }
  return cb(new Error('Error: Please make sure your file is video type'));
};

export const uploadImageS3 = (maxSize = DEFAULT_MAX_SIZE_IMAGE) =>
  uploadS3({
    maxSize,
    fileFilter: checkImage,
  });

export const uploadImageServer = (maxSize = DEFAULT_MAX_SIZE_IMAGE) =>
  uploadServer({
    maxSize,
    fileFilter: checkImage,
  });

export const uploadResourceS3 = (maxSize = DEFAULT_MAX_SIZE_RESOURCE) =>
  uploadS3({
    maxSize,
    fileFilter: checkResource,
  });

export const uploadVideoServer = (maxSize = DEFAULT_MAX_SIZE_VIDEO) =>
  uploadServer({
    maxSize,
    fileFilter: checkVideo,
  });

interface ISizes {
  name: string;
  width: number;
  height: number;
}
interface IUploadResizeImageS3Params {
  name: string;
  sizes: ISizes[];
  bucket?: string;
  maxSize?: number;
}
export const uploadResizeImageS3 =
  ({ name, sizes, bucket, maxSize }: IUploadResizeImageS3Params) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const upload = multer({
      storage: multer.memoryStorage(),
      limits: { fileSize: maxSize || DEFAULT_MAX_SIZE_IMAGE },
      fileFilter: checkImage,
    }).single(name);

    upload(req, res, async (error: any) => {
      if (error) return res.status(500).send(error);
      if (!req.file) return next();

      try {
        const imageData = await Promise.all(
          sizes.map((size) => sharp(req.file.buffer).resize(size.width, size.height).toBuffer()),
        );

        const uuid = uuidv4();
        const params = imageData.map((data, index) => ({
          ACL: 'public-read',
          Bucket: bucket || process.env.AWS_S3_BUCKET,
          Body: data,
          Key: `${uuid}_${req.file.originalname}_${sizes[index].name}.jpg`,
        }));

        const uploadData = await Promise.all(params.map((param) => s3.upload(param).promise()));
        uploadData.forEach((data, index) => {
          const name = sizes[index].name;

          req.file[name] = {};
          req.file[name][`${name}_bucket`] = data.Bucket;
          req.file[name][`${name}_name`] = data.Key;
          req.file[name][`${name}_url`] = data.Location;
        });
      } catch (error) {
        return res.status(500).send(error);
      }

      next();
    });
  };

export const isCanUpload = async (req: Request, res: Response, next: NextFunction) => {
  const user = req['user'] as User;
  const currentDesignId = req['currentDesignId'];
  if (!currentDesignId) {
    return res.status(400).send({
      message: 'Current designId was not attached!',
    });
  }

  const design = await getDesignInfo(currentDesignId);
  if (!design) {
    return res.status(400).send({
      message: 'Design not found!',
    });
  }

  if (design.userId !== user.id) {
    return res.status(403).send({
      message: 'Forbidden',
    });
  }

  if (design.plan == DesignPlan.FREE) {
    return res.status(403).send({
      message: 'Free Plan Cannot Using Upload Function!',
    });
  }

  next();
};
