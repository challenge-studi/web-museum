export type TicketWithCount = Ticket & { count: number };

export default interface Ticket {
  id: number;
  type: string; // child, adult, pass, etc.
  purchase_date: Date;
  expo_id: number;
}
