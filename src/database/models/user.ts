import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import * as argon2 from 'argon2';

export const privateFields = ['password'];

class User extends Model {
  public id!: number;
  public name!: string;
  public emailAddress!: string;
  public phoneNumber!: string;
  public password!: string;
  public role!: 'admin' | 'worker' | 'user';
  public is2FAEnabled!: boolean;
  public twoFactorSecret!: string | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  async verifyPassword(candidatePassword: string): Promise<boolean> {
    try {
      return await argon2.verify(this.password, candidatePassword);
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    emailAddress: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('admin', 'worker', 'user'),
      allowNull: false,
    },
    is2FAEnabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    twoFactorSecret: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    hooks: {
      beforeSave: async (user: User) => {
        if (user.changed('password')) {
          const hash = await argon2.hash(user.password);
          user.password = hash;
        }
      },
    },
  }
);

export default User;
