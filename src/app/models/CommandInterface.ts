export default interface Commande {
  id: number;
  total_price: number;
  order_date: Date;
  status: string; // VARCHAR(15)
  user_id: number;

  getTotalPrice(): number;
  getOrderDate(): Date;
}
