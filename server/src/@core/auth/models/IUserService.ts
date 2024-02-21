import { User } from './User';

export interface IUserService {
  login(): Promise<User | null>;
  register(): Promise<User | null>;
}
