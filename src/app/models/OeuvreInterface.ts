export interface Oeuvre {
  id: number;
  title: string;
  author: number; // artist_id
  year: number;
  description: string;
  type: string; // painting, sculpture, etc.
  expo_id: number;

  getTitle(): string;
  getYear(): number;
  setDescription(description: string): void;
}
