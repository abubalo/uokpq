import { Request, Response, NextFunction } from 'express';
import multer, { memoryStorage } from 'multer';

const upload = multer({
  storage: memoryStorage(),
  limits: { fileSize: 1024 * 1024 * 10 },
}); // 10 MB limit

export function uploader(
  fieldName: string,
  callback: (fileName: string, fileBuffer: Buffer) => Promise<string>
) {
  return [
    upload.single(fieldName),
    async (req: Request, res: Response, next: NextFunction) => {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }
      try {
        const fileName = req.file.originalname;
        const fileBuffer = req.file.buffer;

        const fileUrl = await callback(fileName, fileBuffer);

        req.fileUrl = fileUrl;
      } catch (error) {
        console.error('Error: unable to upload to the R2', error);

        next(error);
      }
    },
  ];
}
