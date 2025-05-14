import { Router } from "express";
import authRoutes from "./auth";
import userRoutes from "./user";
import twoFARoutes from "./2fa";
import helpRequestRoutes from "./helpRequest";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/2fa", twoFARoutes);
// router.use("/help-requests", helpRequestRoutes);

export default router;
