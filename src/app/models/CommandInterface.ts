import { Exposition } from './ExpositionInterface';
import { PriceWithCount } from './PriceInterface';

export type DetailCommand = PriceWithCount & { expo: Exposition };

export interface Commande {
  id: number;
  documentId: string;
  total_price: number | null;
  order_date: Date;
  status: string;
}

export interface CommandApi {
  id: number;
  documentId: string;
  total_price: number;
  order_date: string;
  etat: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  tickets?: {
    type: string;
    price: number;
    quantity: number;
  }[];
}

export interface ResponseApiCommand {
  data: CommandApi[];
  meta: Record<string, any>; // meta qui contient la pagination si beaucoup de commandes
}

export interface QuantityPerPrice {
  price: number;
  quantity: number;
  exposition: number;
}

export function isCommandApi(dataApi: unknown): dataApi is CommandApi {
  if (dataApi && typeof dataApi === 'object' && 'documentId' in dataApi)
    return true;
  else return false;
}

export type { Exposition };
