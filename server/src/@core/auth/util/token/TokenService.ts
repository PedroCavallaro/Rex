import { ITokenService } from './ITokenService';
import * as jwt from 'jsonwebtoken';

export class TokenService implements ITokenService {
  genToken(id: string, email: string, name: string): string {
    return jwt.sign(
      {
        id,
        email,
        name,
      },
      'asdasd',
      {
        expiresIn: 30 * 60,
      },
    );
  }
}
