import { v4 as uuidv4 } from 'uuid';
import * as multerS3 from 'multer-s3';
import * as multer from 'multer';
import { Request, Response, NextFunction, RequestHandler } from 'express';

import { s3 } from './s3';
import { unlinkAsync } from './utils';

const DEFAULT_SERVER_UPLOAD_FOLDER = 'uploads';

interface IUploadS3Params {
  maxSize: number;
  bucket?: string;
  fileFilter?: (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => void;
}
export const uploadS3 = ({ maxSize, bucket, fileFilter }: IUploadS3Params): multer.Multer =>
  multer({
    storage: multerS3({
      s3,
      acl: 'public-read',
      contentType: multerS3.AUTO_CONTENT_TYPE,
      bucket: bucket || process.env.AWS_S3_BUCKET,
      metadata(req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key(req, file, cb) {
        const name = `${uuidv4()}_${file.originalname}`;

        cb(null, name);
      },
    }),
    limits: { fileSize: maxSize },
    fileFilter,
  });

interface IUploadServerParams {
  maxSize: number;
  fileFilter?: (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => void;
}
export const uploadServer = ({ maxSize, fileFilter }: IUploadServerParams): multer.Multer => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, DEFAULT_SERVER_UPLOAD_FOLDER);
    },
    filename: function (req, file, cb) {
      const name = `${uuidv4()}_${file.originalname}`;
      req.on('aborted', () => {
        unlinkAsync(`${DEFAULT_SERVER_UPLOAD_FOLDER}/${name}`);
      });

      cb(null, name);
    },
  });

  return multer({
    storage: storage,
    limits: { fileSize: maxSize },
    fileFilter,
  });
};

export const handleUpload = (upload: RequestHandler) => (req: Request, res: Response, next: NextFunction) => {
  upload(req, res, (error: any) => {
    if (error) return res.status(500).send(error);
    next();
  });
};
