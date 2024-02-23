import * as admin from 'firebase-admin';
import { IFileService } from '../IFileService';
import { Result } from 'src/@core/error/Result';
import { FileReponseDto } from '../dto/FileReponseDto';
import { initializeApp } from 'firebase-admin/app';

export class FirebaseFileService implements IFileService {
  private readonly storage: admin.storage.Storage;

  constructor() {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const key = require('../../../../key.json');
    initializeApp({
      credential: admin.credential.cert(key),
      storageBucket: 'gs://focus-ab0ea.appspot.com',
    });
    this.storage = admin.storage();
  }

  async savePetImage(
    file: Express.Multer.File,
  ): Promise<Result<FileReponseDto>> {
    const bucket = this.storage.bucket();
    const fileName = file.originalname;

    const fileUpload = bucket.file(fileName);

    const stream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    const res: FileReponseDto = await new Promise(async (resolve, reject) => {
      stream.on('error', (err) => {
        reject(err);
      });
      stream.on('finish', async () => {
        const signedUrls = await bucket
          .file(fileName)
          .getSignedUrl({ action: 'read', expires: '12-12-5010' });

        const [imageUrl] = signedUrls;
        console.log(imageUrl);
        resolve({ imageUrl });
      });

      stream.end(file.buffer);
    });

    if (res) {
      return Result.ok<FileReponseDto>(res);
    }
    return null;
  }
}
