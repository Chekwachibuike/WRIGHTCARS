import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import User from './user';

class HelpRequest extends Model {
  public id!: string;
  public userId!: string;
  public workerId!: string | null;
  public description!: string;
  public location!: { lat: number; lng: number };
  public images!: string[];
  public status!: 'pending' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

HelpRequest.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
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
    workerId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    location: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    images: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      defaultValue: [],
    },
    status: {
      type: DataTypes.ENUM('pending', 'accepted', 'in_progress', 'completed', 'cancelled'),
      allowNull: false,
      defaultValue: 'pending',
    },
  },
  {
    sequelize,
    modelName: 'HelpRequest',
    tableName: 'help_requests',
    indexes: [
      {
        fields: ['userId'],
      },
      {
        fields: ['workerId'],
      },
      {
        fields: ['status'],
      },
    ],
  }
);

// Define associations
HelpRequest.belongsTo(User, { foreignKey: 'userId', as: 'user' });
HelpRequest.belongsTo(User, { foreignKey: 'workerId', as: 'worker' });

export default HelpRequest; 