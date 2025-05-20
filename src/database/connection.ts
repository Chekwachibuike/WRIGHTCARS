import sequelize from './config/database';

// Test the database connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    
    // Sync all models with the database
    await sequelize.sync({ alter: true });
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    throw error;
  }
};

export default async function connect() {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully');
    
    // Sync all models
    await sequelize.sync({ alter: true }); // Use { force: true } to drop and recreate tables
    console.log('Database synchronized');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
}

export { sequelize, testConnection };

// const sequelize = new Sequelize('zart_db', 'postgres', '5103', {
//   host: 'localhost',
//   dialect: /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
// });
 