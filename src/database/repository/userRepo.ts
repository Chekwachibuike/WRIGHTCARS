import { formatPhoneNumber } from "../../utils/formatters";
import User from "../models/user";

interface UserAttributes {
  name: string;
  emailAddress: string;
  phoneNumber: string;
  password: string;
  role: 'admin' | 'worker' | 'user';
}

export default class UserRepo {
  static async createUser(user: UserAttributes) {
    const { phoneNumber, ...rest } = user;
    return await User.create({
      ...rest,
      phoneNumber: formatPhoneNumber(phoneNumber),
    });
  }

  static async findByEmail(emailAddress: string) {
    return await User.findOne({ where: { emailAddress } });
  }

  static async getAllUsers() {
    return await User.findAll();
  }

  static async updateUser(updateParams: Partial<User>, id: number) {
    const { password, ...rest } = updateParams;
    const user = await this.findById(id);
    if (!user) return null;
    
    if (password) {
      user.password = password;
      await user.save();
    }
    
    await user.update(rest);
    return user;
  }

  static async findById(id: number) {
    return await User.findByPk(id);
  }

  static async deleteUser(id: number) {
    const user = await this.findById(id);
    if (user) {
      await user.destroy();
      return true;
    }
    return false;
  }
}
