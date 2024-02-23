import { randomUUID } from 'crypto';
import { SavePetDto } from '../dtos/SavePetDto';
import { PetRepository } from '../model/PetRepository';
import { Pet } from '../model/Pet';

export class PetService {
  private readonly petRepo: PetRepository;

  constructor(petRepo: PetRepository) {
    this.petRepo = petRepo;
  }

  async savePet(savePetDto: SavePetDto) {
    const { pet } = savePetDto;
    const newPet = new Pet(
      randomUUID(),
      pet.name,
      pet.sex,
      pet.birthdate,
      pet.picture_url,
      pet.castrated,
      pet.specie_id,
    );
    return await this.petRepo.savePet(newPet, savePetDto.userId);
  }

  async listUserPets(userId: string) {
    return await this.petRepo.listUserPets(userId);
  }
  async listSpecies() {
    return await this.petRepo.listSpecies();
  }
}
