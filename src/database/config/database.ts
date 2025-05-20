import { Sequelize } from 'sequelize';
import config from 'config';
import dotenv from 'dotenv';

// Ensure environment variables are loaded
dotenv.config();

interface DatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

// Get database configuration from config
const dbConfig = config.get<DatabaseConfig>('db');

// Log database configuration (excluding password for security)
console.log('Database Configuration:', {
  host: dbConfig.host,
  port: dbConfig.port,
  username: dbConfig.username,
  database: dbConfig.database,
});

// Create a connection string for Neon Postgres
const connectionString = `postgres://${dbConfig.username}:${dbConfig.password}@${dbConfig.host}/${dbConfig.database}`;

// Create a single Sequelize instance to be used throughout the application
const sequelize = new Sequelize(connectionString, {
  dialect: 'postgres',
  logging: (msg) => console.log('Sequelize:', msg), // Enable detailed logging
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    },
    keepAlive: true,
    idle_in_transaction_session_timeout: 30000,
    statement_timeout: 60000, // 60 seconds
    connectionTimeoutMillis: 10000, // 10 seconds
  },
  pool: {
    max: 1, // Reduce pool size to minimum for testing
    min: 0,
    acquire: 60000,
    idle: 10000
  },
  retry: {
    max: 3,
    match: [/Deadlock/i, /ConnectionError/i, /SequelizeConnectionError/i, /SequelizeConnectionRefusedError/i, /SequelizeHostNotFoundError/i, /SequelizeHostNotReachableError/i, /SequelizeInvalidConnectionError/i, /SequelizeConnectionTimedOutError/i, /TimeoutError/i],
    backoffBase: 1000,
    backoffExponent: 1.5
  }
});

// Test the connection immediately
sequelize.authenticate()
  .then(() => {
    console.log('Connection to Neon DB has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to Neon DB:', err);
    // Log detailed error information
    console.error('Error details:', {
      name: err.name,
      message: err.message,
      stack: err.stack,
      code: err.code,
      errno: err.errno,
      syscall: err.syscall,
      fatal: err.fatal
    });
  });

// Export the sequelize instance
export default sequelize;
