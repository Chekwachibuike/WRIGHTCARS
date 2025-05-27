import { Router } from "express";
import validate from "../../middleware/validate";
import { createPaymentIntentSchema, createPaymentMethodSchema } from "../../validationSchema/payment.schema";
import { PaymentService } from "../../services/payment.service";
import APIResponse from "../../utils/api";

const router = Router();
const paymentService = new PaymentService();

/**
 * @swagger
 * /api/v1/payments/intent:
 *   post:
 *     summary: Create a payment intent
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *               - currency
 *             properties:
 *               amount:
 *                 type: number
 *               currency:
 *                 type: string
 *               paymentMethodId:
 *                 type: string
 *               customerId:
 *                 type: string
 *               metadata:
 *                 type: object
 */
router.post(
  "/intent",
  validate(createPaymentIntentSchema),
  async (req, res) => {
    try {
      const paymentIntent = await paymentService.createPaymentIntent(req.body);
      return APIResponse.success(paymentIntent, 201).send(res);
    } catch (error) {
      return APIResponse.error((error as Error).message).send(res);
    }
  }
);

/**
 * @swagger
 * /api/v1/payments/method:
 *   post:
 *     summary: Create a payment method
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - type
 *               - card
 *             properties:
 *               type:
 *                 type: string
 *               card:
 *                 type: object
 *                 properties:
 *                   number:
 *                     type: string
 *                   exp_month:
 *                     type: number
 *                   exp_year:
 *                     type: number
 *                   cvc:
 *                     type: string
 */
router.post(
  "/method",
  validate(createPaymentMethodSchema),
  async (req, res) => {
    try {
      const paymentMethod = await paymentService.createPaymentMethod(req.body);
      return APIResponse.success(paymentMethod, 201).send(res);
    } catch (error) {
      return APIResponse.error((error as Error).message).send(res);
    }
  }
);

/**
 * @swagger
 * /api/v1/payments/confirm/{paymentIntentId}:
 *   post:
 *     summary: Confirm a payment
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: paymentIntentId
 *         required: true
 *         schema:
 *           type: string
 */
router.post(
  "/confirm/:paymentIntentId",
  async (req, res) => {
    try {
      const { paymentIntentId } = req.params;
      const paymentIntent = await paymentService.confirmPayment(paymentIntentId);
      return APIResponse.success(paymentIntent, 200).send(res);
    } catch (error) {
      return APIResponse.error((error as Error).message).send(res);
    }
  }
);

export default router; 