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

export function isExpositionApi(dataApi: unknown): dataApi is ExpositionApi {
  if (dataApi && typeof dataApi === 'object' && 'documentId' in dataApi)
    return true;
  else return false;
}

export interface ResponseApiExposition {
  data: ExpositionApi[];
}
