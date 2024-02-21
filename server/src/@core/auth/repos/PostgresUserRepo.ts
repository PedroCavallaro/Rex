import { User } from '../models/User';
import { UserRepository } from '../models/UserRepository';

export class PostgresUserRepo implements UserRepository {
  getUser(): Promise<User> {
    throw new Error('Method not implemented.');
  }
  createUser(): Promise<User> {
    throw new Error('Method not implemented.');
  }
}
