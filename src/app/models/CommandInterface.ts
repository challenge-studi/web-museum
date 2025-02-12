export default interface Commande {
  id: number;
  total_price: number;
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
