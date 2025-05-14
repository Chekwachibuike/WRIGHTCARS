import { Sequelize } from 'sequelize';
import config from 'config';

interface DatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

const dbConfig = config.get<DatabaseConfig>('db');

// Log database configuration (excluding password for security)
console.log('Database Configuration:', {
  host: dbConfig.host,
  port: dbConfig.port,
  username: dbConfig.username,
  database: dbConfig.database,
});

export const sequelize = new Sequelize({
  host: dbConfig.host,
  port: dbConfig.port,
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database,
  dialect: 'postgres',
  logging: false, // optional
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});


export default sequelize; 