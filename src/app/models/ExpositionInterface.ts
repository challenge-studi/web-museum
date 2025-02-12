export interface Exposition {
  id: number;
  name: string;
  description: string;
  departure_date: Date;
  end_date: Date;
  imageUrl?: string;
}

export interface ExpositionApi {
  id: number;
  documentId: string;
  name: string;
  description: string;
  departure_date: string;
  end_date: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface ResponseApiExposition {
  data: ExpositionApi[];
}
