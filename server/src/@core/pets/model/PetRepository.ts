import { Result } from 'src/@core/error/Result';
import { Pet } from './Pet';

export interface PetRepository {
  savePet(pet: Pet, userId: string): Promise<Result<Pet>>;
  listUserPets(userId: string): Promise<Result<Pet[]>>;
}
