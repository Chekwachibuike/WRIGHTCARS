import { Router } from "express";
import authRoutes from "./auth";
import userRoutes from "./user";
import twoFARoutes from "./2fa";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/2fa", twoFARoutes);

export default router;
