import { DbService } from 'src/@core/db/DbService';
import { PetRepository } from '../model/PetRepository';
import { Pool, QueryResult } from 'pg';
import { randomUUID } from 'crypto';
import { Result } from 'src/@core/error/Result';
import { Pet } from '../model/Pet';

export class PostgresPetRepository implements PetRepository {
  private readonly dbService: DbService;

  constructor() {
    this.dbService = new Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_DATABASE,
      password: process.env.DB_PASSWORD,
      port: 5432,
      max: 20,
    });
  }

  async savePet(pet: Pet, userId: string): Promise<Result<Pet>> {
    const insertPet = `INSERT INTO "Pet" ("id", "name", "sex", "birhtdate", "picture_url", "castrated", "specie_id") VALUES 
    ($1, $2, $3, $4, $5, $6, $7) RETURNING id;`;
    const insertPetAndOwner = `INSERT INTO "Pet_owner" ("id", "pet_id", "user_id") VALUES 
    ($1, $2, $3);`;

    const { rows }: QueryResult<{ id: string }> = await this.dbService.query(
      insertPet,
      [
        pet.id,
        pet.name,
        pet.sex,
        pet.birthdate,
        pet.picture_url,
        pet.castrated,
        pet.specie_id,
      ],
    );
    const [petCreated] = rows;

    if (petCreated) {
      await this.dbService.query(insertPetAndOwner, [
        randomUUID(),
        petCreated.id,
        userId,
      ]);

      return Result.ok<Pet>(pet);
    }

    return null;
  }
  async listUserPets(userId: string): Promise<Result<Pet[]>> {
    const select = `SELECT p.id, p.name, p.sex, p.birhtdate, p.picture_url, p.castrated, s.specie  FROM "Pet_owner" po INNER JOIN "Pet" p ON p.id = po.pet_id 
      INNER JOIN "Species" s ON p.specie_id = s.id
      WHERE po.user_id = $1`;

    const { rows: pets }: QueryResult<Pet> = await this.dbService.query(
      select,
      [userId],
    );

    return Result.ok<Pet[]>(pets);
  }
  async listAll() {
    const { rows } = await this.dbService.query(`SELECT * FROM "Pet"`);
    return rows;
  }
}
