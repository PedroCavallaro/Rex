import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PetModule } from './modules/pets/pet.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule, PetModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
