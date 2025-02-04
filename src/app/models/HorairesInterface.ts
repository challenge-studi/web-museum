export default interface Horaire {
  id: number;
  day_of_week: string; // VARCHAR(15)
  opening_time: string; // TIME
  closing_time: string; // TIME
}
