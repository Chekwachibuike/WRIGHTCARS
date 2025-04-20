import { Request, Response } from "express";
import UserRepo from "../../../database/repository/userRepo";
import OTPRepo from "../../../database/repository/otpRepo";
import { verify2FAInput } from "../../../validationSchema/2fa";
import APIResponse from "../../../utils/api";

const verify2FAHandler = async (
  req: Request<{}, {}, verify2FAInput>,
  res: Response
) => {
  try {
    const { emailAddress, code } = req.body;
    
    const user = await UserRepo.findByEmail(emailAddress);
    if (!user) {
      return APIResponse.error("User not found", 404).send(res);
    }

    // Verify OTP
    const isValid = await OTPRepo.verifyOTP(user.id, code);
    if (!isValid) {
      return APIResponse.error("Invalid or expired OTP", 400).send(res);
    }

    // Enable 2FA for the user
    await user.update({ is2FAEnabled: true });
    
    return APIResponse.success(
      { message: "2FA enabled successfully" },
      200
    ).send(res);
  } catch (error) {
    return APIResponse.error((error as Error).message).send(res);
  }
};

export default verify2FAHandler; 