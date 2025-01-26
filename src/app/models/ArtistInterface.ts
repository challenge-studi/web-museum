export interface Artist {
  id: number;
  name: string;
  lastname: string;
  birthday: Date;
  death_date: Date;

  getId(): number;
  setId(id: number): void;
  getName(): string;
  setName(name: string): void;
}
