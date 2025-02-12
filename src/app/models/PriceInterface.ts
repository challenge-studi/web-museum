export default interface Price {
  id: number;
  tickets_type: string; // VARCHAR(15)
  price: number;
}

export interface PriceWithCount extends Price {
  count: number;
}

export interface PriceApi {
  id: number;
  documentId: string;
  price: number;
  tickets_type: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  createdBy: any;
  updatedBy: any;
  locale: string;
  localizations: any[];
}

// export interface ApiResponsePrice {
//   data: PriceApi[];
//   meta: {
//     pagination: {
//       page: number;
//       pageSize: number;
//       pageCount: number;
//       total: number;
//     };
//   };
// }
