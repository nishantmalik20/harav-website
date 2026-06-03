export interface BookingRequest {
  name: string;
  email: string;
  phone: string;
  serviceCategory: string;
  serviceName: string;
  date: string;
  time: string;
  esthetician?: string;
  notes?: string;
}

export interface BookingResponse {
  ok: boolean;
  requiresDeposit?: boolean;
  checkoutUrl?: string;
  bookingId?: string;
  error?: string;
}

export interface ContactRequest {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export interface SimpleResponse {
  ok: boolean;
  error?: string;
}
