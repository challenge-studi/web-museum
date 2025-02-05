export type PriceWithCount = Price & { count: number };

export default interface Price {
  id: number;
  tickets_type: string; // VARCHAR(15)
  price: number;
}
