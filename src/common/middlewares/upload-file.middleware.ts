import { IMiddleware } from '../../types/middleware.types';
import { NextFunction, Request, Response } from 'express';
import multer, { diskStorage } from 'multer';
import mime from 'mime-types';
import { nanoid } from 'nanoid';

export class UploadFileMiddleware implements IMiddleware {
  constructor(private directory: string, private fieldName: string) {}

  async execute(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const storage = diskStorage({
      destination: this.directory,
      filename: (
        _req: Request,
        file: Express.Multer.File,
        callback: (error: Error | null, filename: string) => void,
      ) => {
        const extension = mime.extension(file.mimetype);
        const fileNameWithoutExtension = nanoid();
        callback(null, `${fileNameWithoutExtension}.${extension}`);
      },
    });

    const uploadSingleFileMiddleware = multer({ storage }).single(
      this.fieldName,
    );

    uploadSingleFileMiddleware(req, res, next);
  }
}
