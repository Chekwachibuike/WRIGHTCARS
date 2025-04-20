import OTP from '../models/otp';
import { Op } from 'sequelize';
import crypto from 'crypto';

export default class OTPRepo {
  static async generateOTP(userId: number): Promise<string> {
    // Generate a 6-digit OTP
    const code = crypto.randomInt(100000, 999999).toString();
    
    // Set expiration to 5 minutes from now
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
    
    // Create the OTP record
    await OTP.create({
      userId,
      code,
      expiresAt,
    });
    
    return code;
  }

  static async verifyOTP(userId: number, code: string): Promise<boolean> {
    const otp = await OTP.findOne({
      where: {
        userId,
        code,
        isUsed: false,
        expiresAt: {
          [Op.gt]: new Date(),
        },
      },
    });

    if (!otp) {
      return false;
    }

    // Mark the OTP as used
    await otp.update({ isUsed: true });
    return true;
  }

  static async deleteExpiredOTPs(): Promise<void> {
    await OTP.destroy({
      where: {
        [Op.or]: [
          { expiresAt: { [Op.lt]: new Date() } },
          { isUsed: true },
        ],
      },
    });
  }
} 