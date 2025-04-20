import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class OTP extends Model {
  public id!: number;
  public userId!: number;
  public code!: string;
  public expiresAt!: Date;
  public isUsed!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

OTP.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    isUsed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: 'OTP',
    tableName: 'otps',
    indexes: [
      {
        fields: ['userId'],
      },
    ],
  }
);

export default OTP; 