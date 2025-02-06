export default interface Horaire {
  id: number;
  day_of_week: string; // VARCHAR(15)
  opening_time: string; // TIME
  closing_time: string; // TIME
}

export interface HoraireApi {
  id: number;
  documentId: string;
  day_of_week: string;
  opening_time: string;
  closing_time: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface ReponseHoraireApi {
  data: HoraireApi[];
}
