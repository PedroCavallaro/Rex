import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { SavePetDto } from 'src/@core/pets/dtos/SavePetDto';
import { Express } from 'express';
import { PetService } from 'src/@core/pets/services/pet.service';
import { FirebaseFileService } from 'src/@core/file/firebase/FirebaseFileService';

@Controller('pet')
export class PetController {
  @Inject(PetService)
  private readonly petService: PetService;
  @Inject(FirebaseFileService)
  private readonly fbser: FirebaseFileService;

  @Post('save')
  async login(@Body() savePetDto: SavePetDto) {
    console.log(savePetDto);
    const res = await this.petService.savePet(savePetDto);

    if (res.isFailure) {
      return res.error;
    }
    return res.getValue();
  }
  @Post('image')
  @UseInterceptors(FileInterceptor('file'))
  async saveImage(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    return await this.fbser.savePetImage(file);
  }

  @Get('user/:id')
  async register(@Param('id') userId: string) {
    const res = await this.petService.listUserPets(userId);
    if (res.isFailure) {
      return res.error;
    }
    return res.getValue();
  }
  @Get('species')
  async listSpecies() {
    const res = await this.petService.listSpecies();
    if (res.isFailure) {
      return res.error;
    }
    return res.getValue();
  }
}
