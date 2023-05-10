import * as mailer from 'nodemailer';
import * as async from 'async';

import { abort } from './error';

const queue = async.queue(async (callback: any) => {
  await callback();
}, 2);

export default ({ to, subject, message, ...rest }) => {
  try {
    const transporter = mailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT) || 0,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    const mainOptions = {
      from: process.env.MAIL_FROM,
      to,
      subject,
      html: message || '',
      ...rest,
    };
    queue.push(() => {
      transporter.sendMail(mainOptions);
    });
  } catch (e) {
    abort(500, 'Can not send mailer');
  }
};
