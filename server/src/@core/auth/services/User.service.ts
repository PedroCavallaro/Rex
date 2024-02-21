import { IUserService } from '../models/IUserService';
import { User } from '../models/User';

export class UserService implements IUserService {
  login(): Promise<User> {
    throw new Error('Method not implemented.');
  }
  register(): Promise<User> {
    throw new Error('Method not implemented.');
  }
}
