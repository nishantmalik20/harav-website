export type BookingStatus =
  | "new"
  | "confirmed"
  | "completed"
  | "no_show"
  | "cancelled";

export type DepositStatus = "none" | "pending" | "paid";

export interface BookingRow {
  id: string;
  created_at: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  service_category: string;
  service_name: string;
  service_price: number | null;
  preferred_date: string;
  preferred_time: string;
  esthetician: string | null;
  notes: string | null;
  deposit_required: boolean;
  deposit_amount: number;
  deposit_status: DepositStatus;
  stripe_session_id: string | null;
  status: BookingStatus;
}

export interface SubscriberRow {
  id: string;
  email: string;
  created_at: string;
}
