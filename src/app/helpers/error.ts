import { Request, Response } from 'express';

export class AppError extends Error {
  private readonly status: number;

  constructor(status: number, message: string) {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.status = status;
    this.message = message;
    this.name = 'AppError';
  }
}

export const abort = (status: number, message: string): void => {
  throw new AppError(status, message);
};

export const handleError =
  (fuc: any) =>
  async (req: Request, res: Response, next: any): Promise<void> => {
    try {
      await fuc(req, res, next);
    } catch (err) {
      if (!err.status) {
        err.status = 500;
      }
      res.status(err.status).send({
        message: err.message,
      });
    }
  };
