CREATE TABLE "Pet"(
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "sex" BOOLEAN NOT NULL,
    "birhtdate" DATE NOT NULL,
    "picture_url" VARCHAR(255) NOT NULL,
    "castrated" BOOLEAN NOT NULL,
    "specie_id" UUID NOT NULL
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
    "pet_id" UUID NOT NULL,
    "user_id" UUID NOT NULL
);
ALTER TABLE
    "Pet_owner" ADD PRIMARY KEY("id");
CREATE TABLE "Vaccine_pet"(
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "application_date" DATE NOT NULL,
    "pet_id" UUID NOT NULL
);
ALTER TABLE
    "Vaccine_pet" ADD PRIMARY KEY("id");
CREATE TABLE "Medication_pet"(
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "application" VARCHAR(255) NOT NULL,
    "is_used" BOOLEAN NOT NULL,
    "pet_id" UUID NOT NULL
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
    "Pet_owner" ADD CONSTRAINT "pet_owner_id_foreign" FOREIGN KEY("pet_id") REFERENCES "Pet"("id");
ALTER TABLE
    "Pet_owner" ADD CONSTRAINT "pet_owner_id_foreign2" FOREIGN KEY("user_id") REFERENCES "User"("id");

INSERT INTO "User" ("id", "email", "password", "created_at")
VALUES 
    ('123e4567-e89b-12d3-a456-426614174000', 'usuario1@example.com', 'senha123', '2024-02-21'),
    ('223e4567-e89b-12d3-a456-426614174001', 'usuario2@example.com', 'outraSenha456', '2024-02-21'),
    ('323e4567-e89b-12d3-a456-426614174002', 'usuario3@example.com', 'maisUmaSenha789', '2024-02-21');

INSERT INTO "Species" ("id", "specie")
VALUES 
    ('223e4567-e89b-12d3-a456-426614174005', 'Cachorro'),
    ('223e4567-e89b-12d3-a456-426614174010', 'Gato'),
    ('323e4567-e89b-12d3-a456-426614174011', 'Pássaro');

INSERT INTO "Pet" ("id", "name", "sex", "birhtdate", "picture_url", "castrated", "specie_id")
VALUES 
    ('123e4567-e89b-12d3-a456-426614174003', 'Rex', true, '2019-05-10', 'http://example.com/rex.jpg', false, '223e4567-e89b-12d3-a456-426614174005'),
    ('223e4567-e89b-12d3-a456-426614174004', 'Whiskers', false, '2020-02-15', 'http://example.com/whiskers.jpg', true, '223e4567-e89b-12d3-a456-426614174005'),
    ('323e4567-e89b-12d3-a456-426614174005', 'Spot', true, '2018-10-20', 'http://example.com/spot.jpg', false, '223e4567-e89b-12d3-a456-426614174005');

INSERT INTO "Pet_owner" ("id", "pet_id", "user_id")
VALUES 
    ('123e4567-e89b-12d3-a456-426614174006', '123e4567-e89b-12d3-a456-426614174003', '123e4567-e89b-12d3-a456-426614174000'),
    ('223e4567-e89b-12d3-a456-426614174007', '223e4567-e89b-12d3-a456-426614174004', '223e4567-e89b-12d3-a456-426614174001'),
    ('323e4567-e89b-12d3-a456-426614174008', '323e4567-e89b-12d3-a456-426614174005', '323e4567-e89b-12d3-a456-426614174002');


