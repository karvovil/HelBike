import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(
  'bikeJourneyDB',
  'testUser',
  'testPass',
  {
    dialect: 'sqlite',
    storage: "./db/database.sqlite",
    logging: false,
  });

export const connectToDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to DB');
  } catch (err) {
    console.error("Can not connect to db", err);
    return process.exit(1);
  }
  return null;
};