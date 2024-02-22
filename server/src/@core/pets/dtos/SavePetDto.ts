import { Medication } from '../model/Medication';
import { Vaccine } from '../model/Vaccine';

export class SavePetDto {
  userId: string;
  pet: {
    name: string;
    sex: boolean;
    birthdate: Date;
    picture: Blob;
    castrated: boolean;
    specie_id: string;
  };
  vaccine?: Vaccine;
  medication?: Medication;
  constructor(
    userId: string,
    pet: {
      name: string;
      sex: boolean;
      birthdate: Date;
      picture: Blob;
      castrated: boolean;
      specie_id: string;
    },
    vaccine?: Vaccine,
    medication?: Medication,
  ) {
    this.userId = userId;
    this.pet = pet;
    this.vaccine = vaccine;
    this.medication = medication;
  }
}
