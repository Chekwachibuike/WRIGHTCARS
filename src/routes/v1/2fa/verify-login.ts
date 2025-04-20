import { Request, Response } from "express";
import UserRepo from "../../../database/repository/userRepo";
import OTPRepo from "../../../database/repository/otpRepo";
import { verifyLoginOTPInput } from "../../../validationSchema/2fa";
import APIResponse from "../../../utils/api";
import JWTRepo from "../../../database/repository/JWTRepo";
import { formatResponseRecord } from "../../../utils/formatters";

const verifyLoginOTPHandler = async (
  req: Request<{}, {}, verifyLoginOTPInput>,
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

    // Generate access token
    const { password: _, ...rest } = user.get({ plain: true });
    const accessToken = JWTRepo.signAccessToken(rest);
    
    return APIResponse.success(
      { accessToken, ...formatResponseRecord(rest) },
      200
    ).send(res);
  } catch (error) {
    return APIResponse.error((error as Error).message).send(res);
  }
};

export default verifyLoginOTPHandler; 