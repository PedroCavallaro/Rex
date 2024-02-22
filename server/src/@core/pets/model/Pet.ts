export class Pet {
  id: string;
  name: string;
  sex: boolean;
  birthdate: Date;
  picture_url: string;
  castrated: boolean;
  specie_id: string;

  constructor(
    id: string,
    name: string,
    sex: boolean,
    birthdate: Date,
    picture_url: string,
    castrated: boolean,
    specie_id: string,
  ) {
    this.id = id;
    this.name = name;
    this.sex = sex;
    this.birthdate = birthdate;
    this.picture_url = picture_url;
    this.castrated = castrated;
    this.specie_id = specie_id;
  }
}
