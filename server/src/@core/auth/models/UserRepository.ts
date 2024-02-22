import { User } from './User';

export interface UserRepository {
  getUser(email: string): Promise<User | null>;
  createUser(user: User): Promise<User | null>;
}
