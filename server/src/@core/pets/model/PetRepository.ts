import { Result } from 'src/@core/error/Result';
import { Pet } from './Pet';
import { Specie } from './Specie';

export interface PetRepository {
  savePet(pet: Pet, userId: string): Promise<Result<Pet>>;
  listUserPets(userId: string): Promise<Result<Pet[]>>;
  listSpecies(): Promise<Result<Specie[]>>;
}
