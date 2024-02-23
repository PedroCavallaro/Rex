import { Result } from '../error/Result';
import { FileReponseDto } from './dto/FileReponseDto';

export interface IFileService {
  savePetImage(file: Express.Multer.File): Promise<Result<FileReponseDto>>;
}
