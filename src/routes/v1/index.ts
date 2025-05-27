import { Router } from "express";
import authRoutes from "./auth";
import userRoutes from "./user";
import twoFARoutes from "./2fa";
import helpRequestRoutes from "./helpRequest";
import paymentRoutes from "./payment.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/2fa", twoFARoutes);
router.use("/help-requests", helpRequestRoutes);
router.use("/payments", paymentRoutes);

export default router;
