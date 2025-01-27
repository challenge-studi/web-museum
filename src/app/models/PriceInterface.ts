export default interface Price {
  id: number;
  tickets_type: string; // VARCHAR(15)
  price: number;

  getPrice(): number;
  setPrice(price: number): void;
  getTicketsType(): string;
}
