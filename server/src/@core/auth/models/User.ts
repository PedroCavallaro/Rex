export class User {
  id: string;
  created_at: Date;
  email: string;
  password: string;

  constructor(id: string, created_at: Date, email: string, password: string) {
    this.id = id;
    this.created_at = created_at;
    this.email = email;
    this.password = password;
  }
}
