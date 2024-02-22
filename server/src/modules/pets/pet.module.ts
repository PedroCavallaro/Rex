import { Module } from '@nestjs/common';
import { PetController } from './pet.controller';
import { PostgresPetRepository } from 'src/@core/pets/repos/PostgresPetRepository';
import { PetService } from 'src/@core/pets/services/pet.service';

@Module({
  imports: [],
  controllers: [PetController],
  providers: [
    {
      provide: PostgresPetRepository,
      useFactory: () => {
        return new PostgresPetRepository();
      },
    },
    {
      provide: PetService,
      useFactory: (petRepo: PostgresPetRepository) => {
        return new PetService(petRepo);
      },
      inject: [PostgresPetRepository],
    },
  ],
})
export class PetModule {}
