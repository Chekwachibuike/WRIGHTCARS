import { Request, Response } from "express";
import UserRepo from "../../../database/repository/userRepo";
import OTPRepo from "../../../database/repository/otpRepo";
import { enable2FAInput } from "../../../validationSchema/2fa";
import APIResponse from "../../../utils/api";

const enable2FAHandler = async (
  req: Request<{}, {}, enable2FAInput>,
  res: Response
) => {
  try {
    const { emailAddress } = req.body;
    
    const user = await UserRepo.findByEmail(emailAddress);
    if (!user) {
      return APIResponse.error("User not found", 404).send(res);
    }

    // Generate OTP
    const otp = await OTPRepo.generateOTP(user.id);
    
    // TODO: Send OTP to user's email or phone
    // For now, we'll just return it in the response
    // In production, you should use a proper email service or SMS gateway
    
    return APIResponse.success(
      { 
        message: "OTP sent successfully",
        otp // Remove this in production
      },
      200
    ).send(res);
  } catch (error) {
    return APIResponse.error((error as Error).message).send(res);
  }
};

export default enable2FAHandler; 