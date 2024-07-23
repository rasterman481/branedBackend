// const mongoose = require("mongoose");
// mongoose.set("strictQuery", false);

// const connectDb = (uri) =>
//   mongoose
//     .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(console.log("Db connected"))
//     .catch((error) => console.log(error));
// module.exports = { connectDb} ;

require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  port: process.env.DB_PORT,
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  pool: {
    max: 20,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

const connectDb = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('PostgreSQL connected');
  } catch (error) {
    console.error('PostgreSQL connection error:', error);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDb };