import { Request, Response } from 'express';

import { APP, Post } from '../../helpers/decorator';
import auth from '../middlewares/auth';
import { handleUpload } from '../../helpers/upload';
import { uploadImageS3 } from '../middlewares/upload';
import { abort } from '../../helpers/error';

@APP('/upload', [auth])
export default class Upload {
  @Post('/img', [handleUpload(uploadImageS3().single('img'))])
  async uploadImage(req: Request, res: Response) {
    const url = req.file?.['location'];

    if (!url) abort(400, 'Upload Fail!');
    res.status(200).send({
      url,
    });
  }
}
