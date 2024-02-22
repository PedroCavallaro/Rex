export interface IPasswordService {
  comparePassword(password: string, hash: string): Promise<boolean>;
  generateHash(password: string): Promise<string>;
}
