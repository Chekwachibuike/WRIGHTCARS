import { Request, Response } from "express";
import User from "../../../database/models/user";
import UserRepo from "../../../database/repository/userRepo";
import OTPRepo from "../../../database/repository/otpRepo";
import { loginInput } from "../../../validationSchema/user";
import APIResponse from "../../../utils/api";
import { formatResponseRecord } from "../../../utils/formatters";
import JWTRepo from "../../../database/repository/JWTRepo";

const loginHandler = async (
  req: Request<{}, {}, loginInput>,
  res: Response
) => {
  const { password } = req.body;
  try {
    const existingUser = await UserRepo.findByEmail(req.body.emailAddress);
    if (!existingUser) {
      return APIResponse.error("User with email does not exist!", 404).send(res);
    }
    
    const isUserPassword = await existingUser.verifyPassword(password);
    if (!isUserPassword) {
      return APIResponse.error("Invalid email or password!", 400).send(res);
    }

    // If 2FA is enabled, generate and send OTP
    if (existingUser.is2FAEnabled) {
      const otp = await OTPRepo.generateOTP(existingUser.id);
      
      // TODO: Send OTP to user's email or phone
      // For now, we'll just return it in the response
      // In production, you should use a proper email service or SMS gateway
      
      return APIResponse.success(
        { 
          message: "OTP sent successfully",
          requires2FA: true,
          otp // Remove this in production
        },
        200
      ).send(res);
    }

    // If 2FA is not enabled, proceed with normal login
    const { password: _, ...rest } = existingUser.get({ plain: true });
    const accessToken = JWTRepo.signAccessToken(rest);
    return APIResponse.success(
      { accessToken, ...formatResponseRecord(rest) },
      201
    ).send(res);
  } catch (error) {
    return APIResponse.error((error as Error).message).send(res);
  }
};

export default loginHandler;
