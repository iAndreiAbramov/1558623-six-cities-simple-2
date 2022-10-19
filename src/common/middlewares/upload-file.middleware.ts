import { IMiddleware } from '../../types/middleware.types';
import { NextFunction, Request, Response } from 'express';
import multer, { diskStorage } from 'multer';
import mime from 'mime';
import { nanoid } from 'nanoid';

export class UploadFileMiddleware implements IMiddleware {
  constructor(private directory: string, private fileName: string) {}

  async execute(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const storage = diskStorage({
      destination: this.directory,
      filename(
        _req: Request,
        file: Express.Multer.File,
        callback: (error: Error | null, filename: string) => void,
      ) {
        const extension = mime.getExtension(file.mimetype);
        const filename = nanoid();
        callback(null, `${filename}.${extension}`);
      },
    });

    const uploadSingleFileMiddleware = multer({ storage }).single(
      this.fileName,
    );

    uploadSingleFileMiddleware(req, res, next);
  }
}
