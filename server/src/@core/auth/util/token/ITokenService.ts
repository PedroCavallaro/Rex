export interface ITokenService {
  genToken(id: string, email: string, name: string): string;
}
