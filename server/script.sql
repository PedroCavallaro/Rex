CREATE TABLE "Pet"(
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "sex" BOOLEAN NOT NULL,
    "birhtdate" DATE NOT NULL,
    "picture_url" VARCHAR(255) NOT NULL,
    "castrated" BOOLEAN NOT NULL,
    "specie_id" BIGINT NOT NULL
);
ALTER TABLE
    "Pet" ADD PRIMARY KEY("id");
CREATE TABLE "User"(
    "id" UUID NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "created_at" DATE NOT NULL
);
ALTER TABLE
    "User" ADD PRIMARY KEY("id");
CREATE TABLE "Pet_owner"(
    "id" UUID NOT NULL,
    "pet_id" BIGINT NOT NULL,
    "user_id" BIGINT NOT NULL
);
ALTER TABLE
    "Pet_owner" ADD PRIMARY KEY("id");
CREATE TABLE "Vaccine_pet"(
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "application_date" DATE NOT NULL,
    "pet_id" BIGINT NOT NULL
);
ALTER TABLE
    "Vaccine_pet" ADD PRIMARY KEY("id");
CREATE TABLE "Medication_pet"(
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "application" VARCHAR(255) NOT NULL,
    "is_used" BOOLEAN NOT NULL,
    "pet_id" BIGINT NOT NULL
);
ALTER TABLE
    "Medication_pet" ADD PRIMARY KEY("id");
CREATE TABLE "Species"(
    "id" UUID NOT NULL,
    "specie" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "Species" ADD PRIMARY KEY("id");
ALTER TABLE
    "Pet" ADD CONSTRAINT "pet_specie_id_foreign" FOREIGN KEY("specie_id") REFERENCES "Species"("id");
ALTER TABLE
    "Vaccine_pet" ADD CONSTRAINT "vaccine_pet_pet_id_foreign" FOREIGN KEY("pet_id") REFERENCES "Pet"("id");
ALTER TABLE
    "Medication_pet" ADD CONSTRAINT "medication_pet_pet_id_foreign" FOREIGN KEY("pet_id") REFERENCES "Pet"("id");
ALTER TABLE
    "Pet_owner" ADD CONSTRAINT "pet_owner_id_foreign" FOREIGN KEY("id") REFERENCES "Pet"("id");
ALTER TABLE
    "Pet_owner" ADD CONSTRAINT "pet_owner_id_foreign" FOREIGN KEY("id") REFERENCES "User"("id");