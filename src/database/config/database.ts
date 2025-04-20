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
  dialect: 'postgres',
  host: dbConfig.host,
  port: dbConfig.port,
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database,
  logging: console.log, // Enable SQL query logging
});

export default sequelize; 