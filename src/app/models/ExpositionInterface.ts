export interface Exposition {
  id: number;
  name: string;
  description: string;
  departure_date: Date;
  end_date: Date;

  getName(): string;
  getDescription(): string;
  setDepartureDate(date: Date): void;
}
