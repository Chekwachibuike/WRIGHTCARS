import Stripe from "stripe";
import { CreatePaymentIntentRequest, PaymentIntentResponse, PaymentMethodRequest, PaymentMethodResponse } from "../types/payment.types";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-04-30.basil",
});

export class PaymentService {
  async createPaymentIntent(data: CreatePaymentIntentRequest): Promise<PaymentIntentResponse> {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: data.amount,
        currency: data.currency,
        payment_method: data.paymentMethodId,
        customer: data.customerId,
        metadata: data.metadata,
        automatic_payment_methods: {
          enabled: true,
        },
      });

      return {
        clientSecret: paymentIntent.client_secret!,
        paymentIntentId: paymentIntent.id,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
        status: paymentIntent.status,
      };
    } catch (error) {
      throw new Error(`Failed to create payment intent: ${error}`);
    }
  }

  async createPaymentMethod(data: PaymentMethodRequest): Promise<PaymentMethodResponse> {
    try {
      const paymentMethod = await stripe.paymentMethods.create({
        type: data.type as any,
        card: {
          number: data.card.number,
          exp_month: data.card.exp_month,
          exp_year: data.card.exp_year,
          cvc: data.card.cvc,
        },
      });

      return {
        id: paymentMethod.id,
        type: paymentMethod.type,
        card: {
          brand: paymentMethod.card?.brand || "",
          last4: paymentMethod.card?.last4 || "",
          exp_month: paymentMethod.card?.exp_month || 0,
          exp_year: paymentMethod.card?.exp_year || 0,
        },
      };
    } catch (error) {
      throw new Error(`Failed to create payment method: ${error}`);
    }
  }

  async confirmPayment(paymentIntentId: string): Promise<PaymentIntentResponse> {
    try {
      const paymentIntent = await stripe.paymentIntents.confirm(paymentIntentId);

      return {
        clientSecret: paymentIntent.client_secret!,
        paymentIntentId: paymentIntent.id,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
        status: paymentIntent.status,
      };
    } catch (error) {
      throw new Error(`Failed to confirm payment: ${error}`);
    }
  }
} 