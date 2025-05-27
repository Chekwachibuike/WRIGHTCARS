export interface CreatePaymentIntentRequest {
  amount: number;
  currency: string;
  paymentMethodId?: string;
  customerId?: string;
  metadata?: Record<string, string>;
}

export interface PaymentIntentResponse {
  clientSecret: string;
  paymentIntentId: string;
  amount: number;
  currency: string;
  status: string;
}

export interface PaymentMethodRequest {
  type: string;
  card: {
    number: string;
    exp_month: number;
    exp_year: number;
    cvc: string;
  };
}

export interface PaymentMethodResponse {
  id: string;
  type: string;
  card: {
    brand: string;
    last4: string;
    exp_month: number;
    exp_year: number;
  };
} 