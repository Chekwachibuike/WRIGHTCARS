import { z } from "zod";

export const createPaymentIntentSchema = z.object({
  body: z.object({
    amount: z.number().positive(),
    currency: z.string().min(3).max(3),
    paymentMethodId: z.string().optional(),
    customerId: z.string().optional(),
    metadata: z.record(z.string()).optional(),
  }),
});

export const createPaymentMethodSchema = z.object({
  body: z.object({
    type: z.string(),
    card: z.object({
      number: z.string().min(13).max(19),
      exp_month: z.number().min(1).max(12),
      exp_year: z.number().min(new Date().getFullYear()),
      cvc: z.string().min(3).max(4),
    }),
  }),
}); 