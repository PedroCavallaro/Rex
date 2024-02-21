import { User } from './User';

export interface UserRepository {
  getUser(): Promise<User | null>;
  createUser(): Promise<User | null>;
}
