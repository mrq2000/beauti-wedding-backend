import aws = require('aws-sdk');
import { v4 as uuidv4 } from 'uuid';
import fs = require('fs');

const configS3 = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  s3ForcePathStyle: true,
  signatureVersion: 'v4',
  region: process.env.AWS_DEFAULT_REGION,
};

export const s3 = new aws.S3(
  process.env.APP_ENV === 'local' ? { ...configS3, endpoint: process.env.AWS_S3_END_POINT } : configS3,
);

export const getPresignedUrl = (key: string, expires = 30000) => {
  try {
    const url = s3.getSignedUrl('getObject', {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: key,
      Expires: expires,
    });

    return url;
  } catch (e) {
    return null;
  }
};

export const uploadImageS3 = (path: string, filename: string, bucket?: string) => {
  const fileStream = fs.createReadStream(path);

  const uploadParams = {
    Bucket: bucket || process.env.AWS_S3_BUCKET,
    Body: fileStream,
    Key: `${uuidv4()}_${filename}`,
  };

  return s3.upload(uploadParams).promise();
};
